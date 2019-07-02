const userQueries = {
  createUser: `INSERT INTO users(firstname, lastname, email, password, admin) 
  VALUES($1, $2, $3, $4, $5) RETURNING *`,

  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
};

export default userQueries;
