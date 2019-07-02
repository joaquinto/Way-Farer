import db from '../db/index';
import user from '../model/users';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';

const { query } = db;
const { createUser } = user;
const { signToken } = jwtTokenUtils;

export default class UserController {
  static async signUp(req, res, next) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const Password = req.body.password;
    const userEmail = req.body.email.toLowerCase();
    const userPassword = await passwordUtils.hashPassword(Password, next);
    const isAdmin = false;
    const values = [firstName, lastName, userEmail, userPassword, isAdmin];

    try {
      const { rows } = await query(createUser, values);
      const [{
        id, firstname, lastname, email,
        admin,
      }] = rows;
      const token = await signToken(id, email, admin);
      const data = {
        token,
        id,
        firstname,
        lastname,
        email,
        admin,
      };
      return res.status(201).json({ status: 201, message: 'User created successfully', data });
    } catch (error) {
      return next(error);
    }
  }
}
