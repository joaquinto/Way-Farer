import db from '../db/index';
import users from '../model/users';
import bus from '../model/bus';
import booking from '../model/booking';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';
import responseHelper from '../helpers/responseHelper';
import status from '../helpers/status';
import errorHelpers from '../helpers/errorHelpers';

const { query } = db;
const { findUserByEmail } = users;
const { findBusById, getBusCapacity } = bus;
const { getTrip } = trip;
const { responseError } = responseHelper;
const { getSeatNumbers, getBooking } = booking;
const { convertSeatObjectToArray, filterItem } = objectUtils;

export default class Authentication {
  static async isUserExist(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await query(findUserByEmail, [email.toLowerCase()]);
      return rows.length > 0
        ? responseError(res, status.conflict, errorHelpers.userExist)
        : next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async notAUser(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await query(findUserByEmail, [email.toLowerCase()]);
      if (rows.length < 1) {
        return responseError(res, status.notFound, errorHelpers.userNotFound);
      }
      req.user = rows;
      return next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async isAdmin(req, res, next) {
    if (!req.decoded.admin) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
    }
    return next();
  }

  static async isUser(req, res, next) {
    if (req.decoded.admin) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
    }
    return next();
  }

  static async isBusExist(req, res, next) {
    const { bus_id: busId } = req.body;
    try {
      const { rows } = await query(findBusById, [busId]);
      return rows.length < 1
        ? responseError(res, status.notFound, errorHelpers.busNotFound)
        : next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async isSeatNumberExist(req, res, next) {
    let takenSeat = [];
    const { seat_number: seatNumber } = req.body;
    if ((typeof (seatNumber) !== 'undefined') && (typeof (seatNumber) !== 'string')) {
      return responseError(res, status.badRequest, errorHelpers.seatNumberError);
    }
    if (req.seatNumbers.length > 0) {
      const result = convertSeatObjectToArray(req.seatNumbers);
      if (typeof (seatNumber) !== 'undefined') {
        const seatNum = filterItem(result, seatNumber.split(','));
        if (seatNum.length > 0) {
          return responseError(res, status.conflict, seatNum);
        }
      } else {
        takenSeat = result;
        req.takenSeats = takenSeat;
      }
    }
    req.takenSeats = takenSeat;
    return next();
  }

  static async isOwner(req, res, next) {
    try {
      const { rows } = await query(getBooking, [req.params.id]);
      if (rows.length < 1) {
        return responseError(res, status.notFound, errorHelpers.bookingsNotFound);
      }
      const [{ user_id: userId }] = rows;
      return req.decoded.id !== userId
        ? responseError(res, status.unauthorizedAccess, errorHelpers.unauthorizedAccess)
        : next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async isSeatFullyBooked(req, res, next) {
    try {
      const { rows } = await query(getSeatNumbers, [req.body.trip_id]);
      const { rows: newRows } = await query(getBusCapacity, [req.body.trip_id]);
      const [{ capacity }] = newRows;
      req.seatNumbers = rows;
      req.capacity = capacity;
      const result = convertSeatObjectToArray(rows);
      return result.length + 1 === capacity
        ? responseError(res, status.conflict, errorHelpers.fullyBooked)
        : next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async isTripExist(req, res, next) {
    const value = req.body.trip_id || req.params.id;
    try {
      const { rows } = await query(getTrip, [value]);
      return rows.length < 1
        ? responseError(res, status.notFound, errorHelpers.tripsNotFound)
        : next();
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }
}
