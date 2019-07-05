export default class ObjectUtils {
  static changeTripKey(array) {
    let newTrip = {};
    const result = [];
    array.map((tripData) => {
      newTrip.id = tripData.id;
      newTrip.busId = tripData.bus_id;
      newTrip.origin = tripData.origin;
      newTrip.destination = tripData.destination;
      newTrip.tripDate = tripData.trip_date;
      newTrip.fare = tripData.fare;
      result.push(newTrip);
      newTrip = {};
      return result;
    });
    return result;
  }

  static destructureUserData(user, signToken) {
    const [{
      id, firstname, lastname, email,
      admin,
    }] = user;
    const token = signToken(id, email, admin);
    const data = {
      token,
      id,
      firstname,
      lastname,
      email,
      admin,
    };

    return data;
  }

  static destructureTripData(trip) {
    const [{
      id, bus_id: busId, origin,
      destination, trip_date: tripDate,
      fare,
    }] = trip;
    const data = {
      id,
      busId,
      origin,
      destination,
      tripDate,
      fare,
    };

    return data;
  }
}
