import db from '../db/index';
import users from '../model/users';
import bus from '../model/bus';
import booking from '../model/booking';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { findUserByEmail } = users;
const { findBusById, getBusCapacity } = bus;
const { getTrip } = trip;
const { getSeatNumbers, getBooking } = booking;
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

  static async isSeatNumberExist(req, res, next) {
    let takenSeat = [];
    const { seat_number: seatNumber } = req.body;
    if (req.seatNumbers.length > 0) {
      const result = convertSeatObjectToArray(req.seatNumbers);
      if (typeof (seatNumber) !== 'undefined') {
        const seatNum = filterItem(result, seatNumber.split(','));
        if (seatNum.length > 0) {
          return res.status(409).json({ status: 'error', error: seatNum });
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
        return res.status(404).json({ status: 'error', error: 'Booking not Found' });
      }
      const [{ user_id: userId }] = rows;
      if (req.decoded.id !== userId) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
      }
      return next();
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
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
      if (result.length + 1 === capacity) {
        return res.status(409).json({ status: 'error', error: 'These seats has been fully booked for this trip. Kindly book a seat from another bus going to the same destination.' });
      }
      return next();
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }
}
