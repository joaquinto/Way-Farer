import db from '../db/index';
import booking from '../model/booking';
import objectUtils from '../helpers/objectUtils';
import responseHelper from '../helpers/responseHelper';
import status from '../helpers/status';
import errorHelpers from '../helpers/errorHelpers';

const { query } = db;
const { generateSeatNumber } = objectUtils;
const { responseError, responseSuccess } = responseHelper;
const {
  createBooking, getUserBooking, getCurrentBooking, getAllBookings, deleteBooking,
} = booking;

export default class BookingController {
  static async createBooking(req, res) {
    let seatData = [];
    const { seat_number: seatNumber, trip_id: tripId } = req.body;
    const createdOn = new Date();
    if (typeof (seatNumber) !== 'undefined') {
      seatData = seatNumber.split(',');
    } else {
      seatData.push(generateSeatNumber(req));
    }
    const values = [tripId, req.decoded.id, seatData, createdOn];
    try {
      const { rows } = await query(createBooking, values);
      const [{ id: newId }] = rows;
      const { rows: result } = await query(getCurrentBooking, [newId]);
      return responseSuccess(res, status.created, result[0]);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async viewBookings(req, res) {
    try {
      if (req.decoded.admin) {
        const { rows } = await query(getAllBookings);
        return responseSuccess(res, status.ok, rows);
      }
      const { rows } = await query(getUserBooking, [req.decoded.id]);
      return rows.length < 1
        ? responseError(res, status.notFound, errorHelpers.bookingsNotFound)
        : responseSuccess(res, status.ok, rows);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async deleteBooking(req, res) {
    try {
      await query(deleteBooking, [req.params.id]);
      const responseMessage = { message: errorHelpers.deleteBooking };
      return responseSuccess(res, status.ok, responseMessage);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }
}
