import db from './index';
import { seedData } from './queries';

const { userTable, busTable } = seedData;
const seedDatas = async () => {
  try {
    await db.query(userTable);
    console.log('>>>> Data has been seeded');
    await db.query(busTable);
    console.log('>>>> Bus has been seeded');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedDatas,
};

require('make-runnable');
