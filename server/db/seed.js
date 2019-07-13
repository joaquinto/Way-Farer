import db from './index';
import { seedData } from './queries';

const {
  userTable, busTable, tripTable, bookingTable,
} = seedData;
const seedDatas = async () => {
  try {
    await db.query(userTable);
    console.log('>>>> Data has been seeded');
    await db.query(busTable);
    console.log('>>>> Bus has been seeded');
    await db.query(tripTable);
    console.log('>>>> Trip has been seeded');
    await db.query(bookingTable);
    console.log('>>>> Booking has been seeded');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedDatas,
};

require('make-runnable');
