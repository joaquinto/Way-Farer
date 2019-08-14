/* eslint-disable camelcase */
import db from '../db/index';
import trip from '../model/trips';
import objectUtils from '../helpers/objectUtils';
import responseHelper from '../helpers/responseHelper';
import status from '../helpers/status';
import errorHelpers from '../helpers/errorHelpers';

const { query } = db;
const { convertStringToTitle } = objectUtils;
const { responseError, responseSuccess } = responseHelper;
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
      return responseSuccess(res, status.created, rows[0]);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async getAllTrips(req, res) {
    const { destination, origin } = req.query;
    try {
      if (typeof (destination) !== 'undefined') {
        const { rows } = await query(filterTripsByDestination, [convertStringToTitle(destination)]);
        return rows.length < 1
          ? responseError(res, status.notFound, errorHelpers.tripsNotFound)
          : responseSuccess(res, status.ok, rows);
      }
      if (typeof (origin) !== 'undefined') {
        const { rows } = await query(filterTripsByOrigin, [convertStringToTitle(origin)]);
        return rows.length < 1
          ? responseError(res, status.notFound, errorHelpers.tripsNotFound)
          : responseSuccess(res, status.ok, rows);
      }
      const { rows } = await query(getAllTrips);
      return rows.length < 1
        ? responseError(res, status.notFound, errorHelpers.tripsNotFound)
        : responseSuccess(res, status.ok, rows);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async cancelTrip(req, res) {
    try {
      await query(cancelTrip, [false, req.params.id]);
      const responseMessage = { message: errorHelpers.cancelTrip };
      return responseSuccess(res, status.ok, responseMessage);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }
}
