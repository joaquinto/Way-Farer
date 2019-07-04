import db from '../db/index';
import trip from '../model/trips';

const { query } = db;
const { createTrip } = trip;

export default class TripController {
  static async createTrip(req, res, next) {
    const {
      bus_id: busId, origin, destination, trip_date: tripsDate, fare,
    } = req.body;
    const date = new Date(tripsDate);

    const values = [busId, origin, destination, fare, date];

    try {
      const { rows } = await query(createTrip, values);
      const [{
        id: tripId, bus_id: tripBusId, origin: tripOrigin,
        destination: tripDestination, trip_date: tripDate,
        fare: tripFare,
      }] = rows;
      const data = {
        tripId,
        tripBusId,
        tripOrigin,
        tripDestination,
        tripDate,
        tripFare,
      };
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return next(error);
    }
  }
}
