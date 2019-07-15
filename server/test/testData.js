const data = {
  missingFirstname: {
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  missingLastname: {
    first_name: 'Drake',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  missingSignupEmail: {
    first_name: 'Drake',
    last_name: 'Lawson',
    password: 'Drake2019',
  },
  missingSignupPassword: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'Drakelawson@gmail.com',
  },
  uInvalidSignUpPassword1: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'drake2019',
  },
  lInvalidSignUpPassword: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'DRAKE2019',
  },
  dInvalidSignUpPassword: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drakes',
  },
  ldInvalidSignUpPassword: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'D',
  },
  signUp: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptySignUpFirstname: {
    first_name: '',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptySignUpLastname: {
    first_name: 'Drake',
    last_name: '',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptysignUpemail: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: '',
    password: 'Drake2019',
  },
  emptySignUpPassword: {
    first_name: 'Drake',
    last_name: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: '',
  },
  signIn: {
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  specialSignIn: {
    email: 'johngabriel@gmail.com',
    password: 'Jack2019',
  },
  signInWithWrongPassword: {
    email: 'drakelawson@gmail.com',
    password: 'Drake20195',
  },
  client: {
    email: 'jacklangley@gmail.com',
    password: 'Jack2019',
  },
  missingEmail: {
    password: 'Drake2019',
  },
  emptyEmail: {
    email: '',
    password: 'Drake2019',
  },
  missingPassword: {
    email: 'drakelawson@gmail.com',
  },
  emptyPassword: {
    email: 'drakelawson@gmail.com',
    password: '',
  },
  invalidEmail: {
    email: 'fuehfejifhei',
    password: 'Drake2019',
  },
  uInvalidPassword: {
    email: 'drakelawson@gmail.com',
    password: 'drake2019',
  },
  lInvalidPassword: {
    email: 'drakelawson@gmail.com',
    password: 'DRAKE2019',
  },
  dInvalidPassword: {
    email: 'drakelawson@gmail.com',
    password: 'D',
  },
  ldInvalidPassword: {
    email: 'drakelawson@gmail.com',
    password: 'Dr29',
  },
  missingBusId: {
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  emptyBusId: {
    bus_id: '',
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  missingOrigin: {
    bus_id: 1,
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  emptyOrigin: {
    bus_id: 1,
    origin: '',
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  missingDestination: {
    bus_id: 1,
    origin: 'Port Harcourt',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  emptyDestination: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: '',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  missingTripDate: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: 'Lagos',
    fare: 5000,
  },
  emptyTripDate: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '',
    fare: 5000,
  },
  missingFare: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '2019-10-06',
  },
  emptyFare: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: '',
  },
  createTrip: {
    bus_id: 1,
    origin: 'Port Harcourt',
    destination: 'Lagos',
    trip_date: '2019-10-06',
    fare: 5000,
  },
  missingTripId: {
    seat_number: 5,
  },
  missingSeatNumber: {
    trip_id: 1,
  },
  emptyTripId: {
    trip_id: '',
    seat_number: 5,
  },
  emptySeatNumber: {
    trip_id: 1,
    seat_number: '',
  },
  invalidSeatNumber: {
    trip_id: 1,
    seat_number: 'gfjrk',
  },
  invalidTipId: {
    trip_id: 'hbfjrf',
    seat_number: 5,
  },
  highSeatNumber: {
    trip_id: 1,
    seat_number: 30,
  },
  booking: {
    trip_id: 1,
    seat_number: 5,
  },
  duplicateBooking: {
    trip_id: 1,
    seat_number: 5,
  },
  sameUserBooking: {
    trip_id: 1,
    seat_number: 7,
  },
  bookingSignIn: {
    email: 'johnsnow@gmail.com',
    password: 'Jack2019',
  },
};

export default data;
