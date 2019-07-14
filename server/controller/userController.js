/* eslint-disable camelcase */
import db from '../db/index';
import user from '../model/users';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';

const { query } = db;
const { createUser, findUserByEmail } = user;
const { signToken } = jwtTokenUtils;

export default class UserController {
  static async signUp(req, res, next) {
    const {
      first_name: firstName, last_name: lastName, password, email: userEmail,
    } = req.body;
    const userPassword = await passwordUtils.hashPassword(password, next);
    const isAdmin = false;
    const values = [firstName, lastName, userEmail.toLowerCase(), userPassword, isAdmin];

    try {
      const { rows } = await query(createUser, values);
      const [{
        user_id, first_name, last_name, email,
        is_admin,
      }] = rows;
      const token = signToken(user_id, email, is_admin);
      const data = {
        token,
        user_id,
        first_name,
        last_name,
        email,
        is_admin,
      };
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return next(error);
    }
  }

  static async signIn(req, res, next) {
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      const [{ password }] = rows;
      const isMatch = await passwordUtils.comparePassword(userPassword, password);
      if (isMatch) {
        const [{
          user_id, first_name, last_name, email,
          is_admin,
        }] = rows;
        const token = signToken(user_id, email, is_admin);
        const data = {
          token,
          user_id,
          first_name,
          last_name,
          email,
          is_admin,
        };
        return res.status(200).json({ status: 'success', data });
      }
      return res.status(405).json({ status: 'error', error: 'Incorrect password, input the correct password.' });
    } catch (error) {
      return next(error);
    }
  }
}
