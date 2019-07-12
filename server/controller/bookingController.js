import db from '../db/index';
import booking from '../model/booking';

const { query } = db;
const { createBooking, getUserBooking } = booking;

export default class BookingController {
  static async createBooking(req, res, next) {
    const { seat_number: seatNo, trip_id: tripId } = req.body;
    const createdOn = new Date();
    const seatData = seatNo.split(',');
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${seatData}`);

    const values = [tripId, req.decoded.id, seatData, createdOn];
    try {
      const { rows } = await query(createBooking, values);
      if (rows.length > 0) {
        const { rows: result } = await query(getUserBooking, [req.decoded.id]);
        return res.status(201).json({ status: 'success', data: result });
      }
      return res.status(404).json({ status: 'error', error: 'No data found' });
    } catch (error) {
      return next(error);
    }
  }
}
