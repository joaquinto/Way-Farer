const tripQueries = {
  createTrip: `INSERT INTO trip(bus_id, origin, destination, fare, trip_date) 
  VALUES($1, $2, $3, $4, $5) RETURNING *`,

  getAllTrips: 'SELECT id, bus_id, origin, destination, trip_date, fare FROM trip',
};

export default tripQueries;
