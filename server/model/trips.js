const tripQueries = {
  createTrip: `INSERT INTO trip(bus_id, origin, destination, fare, trip_date) 
  VALUES($1, $2, $3, $4, $5) RETURNING id, bus_id, origin, destination, trip_date, fare`,

  getAllTrips: 'SELECT id, bus_id, origin, destination, trip_date, fare FROM trip',

  filterTripsByDestination: 'SELECT id, bus_id, origin, destination, trip_date, fare FROM trip WHERE destination = $1',

  cancelTrip: 'UPDATE trip SET active = $1 WHERE id = $2',

  getTrip: 'SELECT * FROM trip WHERE id = $1',
};

export default tripQueries;
