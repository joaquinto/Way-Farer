import db from '../db/index';
import booking from '../model/booking';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { generateSeatNumber } = objectUtils;
const {
  createBooking, getUserBooking, getCurrentBooking, getAllBookings, deleteBooking,
} = booking;

export default class BookingController {
  static async createBooking(req, res, next) {
    const seatData = [];
    const { trip_id: tripId } = req.body;
    const createdOn = new Date();
    seatData.push(generateSeatNumber(req));

    const values = [tripId, req.decoded.id, seatData, createdOn];
    try {
      const { rows } = await query(createBooking, values);
      const [{ id: newId }] = rows;
      if (rows.length > 0) {
        const { rows: result } = await query(getCurrentBooking, [newId]);
        const [{
          // eslint-disable-next-line camelcase
          id, trip_id, user_id, bus_id, trip_date, seat_number, first_name, last_name, email,
        }] = result;
        const data = {
          id,
          trip_id,
          user_id,
          bus_id,
          trip_date,
          seat_number,
          first_name,
          last_name,
          email,
        };
        return res.status(201).json({ status: 'success', data });
      }
      return res.status(404).json({ status: 'error', error: 'Booking data found' });
    } catch (error) {
      return next(error);
    }
  }

  static async viewBookings(req, res, next) {
    try {
      if (req.decoded.admin) {
        const { rows } = await query(getAllBookings);
        return res.status(200).json({ status: 'success', data: rows });
      }
      const { rows } = await query(getUserBooking, [req.decoded.id]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'No data Found' });
      }
      return res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
      return next(error);
    }
  }

  static async deleteBooking(req, res, next) {
    try {
      await query(deleteBooking, [req.params.id]);
      return res.status(200).json({ status: 'success', data: { message: 'Booking deleted successfully' } });
    } catch (error) {
      return next(error);
    }
  }
}
