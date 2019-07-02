const createTable = {
  userTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(35) NOT NULL,
    lastname VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT false
  )`,
};

const dropTable = {
  dropUserTable: 'DROP TABLE IF EXISTS users CASCADE',
};

export {
  createTable,
  dropTable,
};
