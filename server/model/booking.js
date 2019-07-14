const bookingQueries = {
  createBooking: `INSERT INTO booking(trip_id, user_id, seat_number, created_on) 
  VALUES($1, $2, $3, $4) RETURNING *`,

  getUserBooking: 'SELECT booking.booking_id, booking.trip_id, booking.user_id, trip.bus_id, trip.trip_date, booking.seat_number, users.first_name, users.last_name, users.email FROM trip INNER JOIN booking On booking.trip_id = trip.trip_id INNER JOIN users ON booking.user_id = users.user_id WHERE booking.user_id = $1',

  getCurrentBooking: 'SELECT booking.booking_id, booking.trip_id, booking.user_id, trip.bus_id, trip.trip_date, booking.seat_number, users.first_name, users.last_name, users.email FROM trip INNER JOIN booking On booking.trip_id = trip.trip_id INNER JOIN users ON booking.user_id = users.user_id WHERE booking.booking_id = $1',

  getSeatNumbers: 'SELECT seat_number FROM booking',

  getBooking: 'SELECT * FROM booking WHERE booking_id = $1',

  deleteBooking: 'DELETE FROM booking WHERE booking_id = $1',

  getAllBookings: 'SELECT booking.booking_id, booking.trip_id, booking.user_id, trip.bus_id, trip.trip_date, booking.seat_number, users.first_name, users.last_name, users.email FROM trip INNER JOIN booking On booking.trip_id = trip.trip_id INNER JOIN users ON booking.user_id = users.user_id',

  checkForUser: 'SELECT * FROM booking WHERE user_id = $1',
};

export default bookingQueries;
