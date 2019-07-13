import db from '../db/index';
import booking from '../model/booking';

const { query } = db;
const {
  createBooking, getUserBooking, getCurrentBooking, getAllBookings, deleteBooking,
} = booking;

export default class BookingController {
  static async createBooking(req, res, next) {
    const { seat_number: seatNo, trip_id: tripId } = req.body;
    const createdOn = new Date();
    const seatData = seatNo.split(',');

    const values = [tripId, req.decoded.id, seatData, createdOn];
    try {
      const { rows } = await query(createBooking, values);
      const [{ id }] = rows;
      if (rows.length > 0) {
        const { rows: result } = await query(getCurrentBooking, [id]);
        return res.status(201).json({ status: 'success', data: result });
      }
      return res.status(404).json({ status: 'error', error: 'No data found' });
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
