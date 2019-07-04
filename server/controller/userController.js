import db from '../db/index';
import user from '../model/users';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';

const { query } = db;
const { createUser, findUserByEmail } = user;
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
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return next(error);
    }
  }

  static async signIn(req, res, next) {
    const message = 'User password does not match';
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      const [{
        id, firstname, lastname, email, password,
        admin,
      }] = rows;
      const isMatch = await passwordUtils.comparePassword(userPassword, password);
      if (isMatch) {
        const token = signToken(id, email, admin);
        const data = {
          token,
          id,
          firstname,
          lastname,
          email,
          admin,
        };
        return res.status(200).json({ status: 'success', data });
      }
      return res.status(405).json({ status: 'error', error: message });
    } catch (error) {
      return next(error);
    }
  }
}
