import db from '../db/index';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { createTrip, getAllTrips, cancelTrip } = trip;
const { changeTripKey, destructureTripData } = objectUtils;

export default class TripController {
  static async createTrip(req, res, next) {
    const {
      bus_id: tripBusId, origin: tripOrigin,
      destination: tripDestination, trip_date: tripsDate, fare: tripFare,
    } = req.body;

    const values = [tripBusId, tripOrigin, tripDestination, tripFare, tripsDate];

    try {
      const { rows } = await query(createTrip, values);
      const data = destructureTripData(rows);
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return next(error);
    }
  }

  static async getAllTrips(req, res, next) {
    try {
      const { rows } = await query(getAllTrips);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Trips not found' });
      }
      return res.status(200).json({ status: 'success', data: changeTripKey(rows) });
    } catch (error) {
      return next(error);
    }
  }

  static async cancelTrip(req, res, next) {
    try {
      await query(cancelTrip, [false, req.params.id]);
      return res.status(200).json({ status: 'success', data: { message: 'Trip cancelled successfully' } });
    } catch (error) {
      return next(error);
    }
  }
}
