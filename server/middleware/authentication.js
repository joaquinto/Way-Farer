import db from '../db/index';
import users from '../model/users';
import bus from '../model/bus';
import booking from '../model/booking';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { findUserByEmail } = users;
const { findBusById } = bus;
const { getTrip } = trip;
const { getSeatNumbers, checkForUser, getBooking } = booking;
const { convertSeatObjectToArray, filterItem } = objectUtils;

export default class Authentication {
  static async isUserExist(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await query(findUserByEmail, [email.toLowerCase()]);
      if (rows.length > 0) {
        return res.status(409).json({ status: 'error', error: 'User already exist' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async notAUser(req, res, next) {
    const { email } = req.body;
    try {
      const { rows } = await query(findUserByEmail, [email.toLowerCase()]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'User Not Found' });
      }
      req.user = rows;
      return next();
    } catch (error) {
      return next(error);
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
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Bus not Found' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async hasUserBooked(req, res, next) {
    try {
      const { rows } = await query(checkForUser, [req.decoded.id]);
      if (rows.length > 0) {
        return res.status(409).json({
          status: 'error',
          error: 'You have already booked for this trip. If you want to book another seat for this trip, Kindly cancel your previous booking and select multiple seat number from the available seats for this trip.',
        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async isSeatNumberExist(req, res, next) {
    const { seat_number: seatNumber } = req.body;
    try {
      const { rows } = await query(getSeatNumbers);
      if (rows.length > 0) {
        const result = convertSeatObjectToArray(rows);
        const seatNum = filterItem(result, seatNumber.split(','));
        if (seatNum.length > 0) {
          return res.status(409).json({ status: 'error', error: seatNum });
        }
      }
      return next();
    } catch (error) {
      return next();
    }
  }

  static async isOwner(req, res, next) {
    try {
      const { rows } = await query(getBooking, [req.params.id]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Booking not Found' });
      }
      const [{ user_id: userId }] = rows;
      if (req.decoded.id !== userId) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async isTripExist(req, res, next) {
    try {
      const { rows } = await query(getTrip, [req.params.id]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Trip not Found' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
