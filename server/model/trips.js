const tripQueries = {
  createTrip: `INSERT INTO trip(bus_id, origin, destination, fare, trip_date) 
  VALUES($1, $2, $3, $4, $5) RETURNING trip_id, bus_id, origin, destination, trip_date, fare`,

  getAllTrips: 'SELECT trip_id, bus_id, origin, destination, trip_date, fare FROM trip',

  cancelTrip: 'UPDATE trip SET active = $1 WHERE trip_id = $2',

  getTrip: 'SELECT * FROM trip WHERE trip_id = $1',
};

export default tripQueries;
