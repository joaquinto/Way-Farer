const createTable = {
  userTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(35) NOT NULL,
    lastname VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT false
  )`,
  busTable: `CREATE TABLE IF NOT EXISTS bus(
    id SERIAL PRIMARY KEY,
    number_plate VARCHAR(9) NOT NULL,
    manufacturer VARCHAR(35) NOT NULL,
    model VARCHAR(35) NOT NULL,
    year VARCHAR(4) NOT NULL,
    capacity INTEGER NOT NULL
  )`,
  tripTable: `CREATE TABLE IF NOT EXISTS trip(
    id SERIAL PRIMARY KEY,
    bus_id INTEGER NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    fare NUMERIC(15, 2) NOT NULL,
    trip_date VARCHAR(10) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (bus_id) REFERENCES bus (id)
  )`,
  bookingTable: `CREATE TABLE IF NOT EXISTS booking(
    id SERIAL,
    trip_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    seat_no INTEGER[] NOT NULL,
    created_on TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, trip_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (trip_id) REFERENCES trip (id)
  )`,
};

const dropTable = {
  dropUserTable: 'DROP TABLE IF EXISTS users CASCADE',
  dropBusTable: 'DROP TABLE IF EXISTS bus CASCADE',
  dropTripTable: 'DROP TABLE IF EXISTS trip CASCADE',
  dropBookingTable: 'DROP TABLE IF EXISTS booking CASCADE',
};

const hashedPassword = '$2a$10$zig2e9fhVQkMTeedn.efUeIi8QkQ/p9HMcojoJTCfpUyuStP60fqe';

const seedData = {
  userTable: `INSERT INTO 
  users(firstname, lastname, email, password, admin) 
    VALUES('Jack', 'Langley', 'jacklangley@gmail.com', '${hashedPassword}', true),
    ('John', 'Gabriel', 'johngabriel@gmail.com', '${hashedPassword}', false),
    ('John', 'Snow', 'johnsnow@gmail.com','${hashedPassword}', false)`,

  busTable: `INSERT INTO 
  bus(number_plate, manufacturer, model, year, capacity)
    VALUES('SMK-123ZE', 'Toyota', 'Hiace', '2010', 15),
    ('SMK-567BN', 'Toyota', 'Hiace', '2010', 15),
    ('GGE-945GE', 'Toyota', 'Hiace', '2010', 15)`,

  tripTable: `INSERT INTO
  trip(bus_id, origin, destination, fare, trip_date)
    VALUES(1, 'Texas', 'New York', '15000.00', '2019-10-06'),
    (2, 'Abuja', 'Lagos', '10000.00', '2019-10-06')`,

  bookingTable: `INSERT INTO
    booking(trip_id, user_id, seat_no, created_on)
      VALUES(1, '2', '{6}', '2019-10-09')`,
};

export {
  createTable,
  dropTable,
  seedData,
};
