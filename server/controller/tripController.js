/* eslint-disable camelcase */
import db from '../db/index';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';

const { query } = db;
const { convertStringToTitle } = objectUtils;
const {
  createTrip, getAllTrips, cancelTrip, filterTripsByDestination,
  filterTripsByOrigin,
} = trip;

export default class TripController {
  static async createTrip(req, res) {
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

  static async getAllTrips(req, res) {
    const { destination, origin } = req.query;
    try {
      if (typeof (destination) !== 'undefined') {
        const { rows } = await query(filterTripsByDestination, [convertStringToTitle(destination)]);
        if (rows.length < 1) {
          return res.status(404).json({ status: 'error', error: 'Trips not found' });
        }
        return res.status(200).json({ status: 'success', data: rows });
      }
      if (typeof (origin) !== 'undefined') {
        const { rows } = await query(filterTripsByOrigin, [convertStringToTitle(origin)]);
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
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

  static async cancelTrip(req, res) {
    try {
      await query(cancelTrip, [false, req.params.id]);
      return res.status(200).json({ status: 'success', data: { message: 'Trip cancelled successfully' } });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }
}
