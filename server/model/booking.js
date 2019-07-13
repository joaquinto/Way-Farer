const bookingQueries = {
  createBooking: `INSERT INTO booking(trip_id, user_id, seat_no, created_on) 
  VALUES($1, $2, $3, $4) RETURNING *`,

  getUserBooking: 'SELECT booking.id, booking.trip_id, booking.user_id, trip.bus_id, trip.trip_date, booking.seat_no, users.firstname, users.lastname, users.email FROM trip INNER JOIN booking On booking.trip_id = trip.id INNER JOIN users ON booking.user_id = users.id WHERE user_id = $1',

  getCurrentBooking: 'SELECT booking.id, booking.trip_id, booking.user_id, trip.bus_id, trip.trip_date, booking.seat_no, users.firstname, users.lastname, users.email FROM trip INNER JOIN booking On booking.trip_id = trip.id INNER JOIN users ON booking.user_id = users.id WHERE booking.id = $1',

  getSeatNumbers: 'SELECT seat_no FROM booking',

  checkForUser: 'SELECT * FROM booking WHERE user_id = $1',
};

export default bookingQueries;
