const userQueries = {
  createUser: `INSERT INTO users(first_name, last_name, email, password, is_admin) 
  VALUES($1, $2, $3, $4, $5) RETURNING *`,

  findUserByEmail: 'SELECT * FROM users WHERE email = $1',
};

export default userQueries;
