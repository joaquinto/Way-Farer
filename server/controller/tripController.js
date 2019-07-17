/* eslint-disable camelcase */
import db from '../db/index';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { convertStringToTitle } = objectUtils;
const {
  createTrip, getAllTrips, cancelTrip, filterTripsByDestination,
} = trip;

export default class TripController {
  static async createTrip(req, res, next) {
    const {
      bus_id: tripBusId, origin: tripOrigin,
      destination: tripDestination, trip_date: tripsDate, fare: tripFare,
    } = req.body;

    const values = [
      tripBusId, convertStringToTitle(tripOrigin),
      convertStringToTitle(tripDestination), tripFare, tripsDate,
    ];

    try {
      const { rows } = await query(createTrip, values);
      const [{
        id, bus_id, origin, destination, trip_date, fare,
      }] = rows;
      const data = {
        id,
        bus_id,
        origin,
        destination,
        trip_date,
        fare,
      };
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return next(error);
    }
  }

  static async getAllTrips(req, res, next) {
    const { destination } = req.query;
    try {
      if (typeof (destination) !== 'undefined') {
        const { rows } = await query(filterTripsByDestination, [convertStringToTitle(destination)]);
        if (rows.length < 1) {
          return res.status(404).json({ status: 'error', error: 'Trips not found' });
        }
        return res.status(200).json({ status: 'success', data: rows });
      }
      const { rows } = await query(getAllTrips);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Trips not found' });
      }
      return res.status(200).json({ status: 'success', data: rows });
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
