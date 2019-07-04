import db from './index';
import { createTable, dropTable } from './queries';

const { userTable, busTable, tripTable } = createTable;
const { dropUserTable, dropBusTable, dropTripTable } = dropTable;

const createTables = async () => {
  try {
    await db.query(userTable);
    await db.query(busTable);
    await db.query(tripTable);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    await db.query(dropUserTable);
    await db.query(dropBusTable);
    await db.query(dropTripTable);
  } catch (error) {
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};

require('make-runnable');
