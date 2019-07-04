const tripQueries = {
  createTrip: `INSERT INTO trip(bus_id, origin, destination, fare, trip_date) 
  VALUES($1, $2, $3, $4, $5) RETURNING *`,
};

export default tripQueries;
