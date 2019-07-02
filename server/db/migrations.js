import db from './index';
import { createTable, dropTable } from './queries';

const { userTable } = createTable;
const { dropUserTable } = dropTable;

const createTables = async () => {
  try {
    await db.query(userTable);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    await db.query(dropUserTable);
  } catch (error) {
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};

require('make-runnable');
