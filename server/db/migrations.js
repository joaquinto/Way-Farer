import db from './index';
import { createTable, dropTable } from './queries';

const {
  userTable, busTable,
  tripTable, bookingTable,
} = createTable;
const {
  dropUserTable, dropBusTable,
  dropTripTable, dropBookingTable,
} = dropTable;

const createTables = async () => {
  try {
    await db.query(userTable);
    await db.query(busTable);
    await db.query(tripTable);
    await db.query(bookingTable);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    await db.query(dropUserTable);
    await db.query(dropBusTable);
    await db.query(dropTripTable);
    await db.query(dropBookingTable);
  } catch (error) {
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};

require('make-runnable');
