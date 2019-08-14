const userQueries = {
  createUser: `INSERT INTO users(first_name, last_name, email, password) 
  VALUES($1, $2, $3, $4) RETURNING *`,

  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
};

export default userQueries;
