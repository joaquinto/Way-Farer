const data = {
  missingFirstname: {
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  missingLastname: {
    firstname: 'Drake',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  missingSignupEmail: {
    firstname: 'Drake',
    lastname: 'Lawson',
    password: 'Drake2019',
  },
  missingSignupPassword: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'Drakelawson@gmail.com',
  },
  uInvalidSignUpPassword1: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'drake2019',
  },
  lInvalidSignUpPassword: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'DRAKE2019',
  },
  dInvalidSignUpPassword: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drakes',
  },
  ldInvalidSignUpPassword: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Dra2',
  },
  signUp: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptySignUpFirstname: {
    firstname: '',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptySignUpLastname: {
    firstname: 'Drake',
    lastname: '',
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
  },
  emptysignUpemail: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: '',
    password: 'Drake2019',
  },
  emptySignUpPassword: {
    firstname: 'Drake',
    lastname: 'Lawson',
    email: 'drakelawson@gmail.com',
    password: '',
  },
  signIn: {
    email: 'drakelawson@gmail.com',
    password: 'Drake2019',
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
    password: 'Drakes',
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
};

export default data;
