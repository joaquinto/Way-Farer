/* eslint-disable camelcase */
import db from '../db/index';
import user from '../model/users';
import jwtTokenUtils from '../helpers/jwtTokenUtils';
import passwordUtils from '../helpers/passwordUtils';
import responseHelper from '../helpers/responseHelper';
import status from '../helpers/status';
import errorHelpers from '../helpers/errorHelpers';

const { query } = db;
const { responseError, responseSuccess } = responseHelper;
const { createUser, findUserByEmail } = user;
const { signToken } = jwtTokenUtils;

export default class UserController {
  static async signUp(req, res, next) {
    const {
      first_name: firstName, last_name: lastName, password, email: userEmail,
    } = req.body;
    const userPassword = await passwordUtils.hashPassword(password, next);
    const values = [firstName, lastName, userEmail.toLowerCase(), userPassword];

    try {
      const { rows } = await query(createUser, values);
      const responseData = UserController.createUserObject(rows);
      return responseSuccess(res, status.created, responseData);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static async signIn(req, res) {
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      const [{ password }] = rows;
      const isMatch = await passwordUtils.comparePassword(userPassword, password);
      if (isMatch) {
        const responseData = UserController.createUserObject(rows);
        return responseSuccess(res, status.ok, responseData);
      }
      return responseError(res, status.methodNotAllowed, errorHelpers.incorrectPassword);
    } catch (error) {
      return responseError(res, status.internalServerError, errorHelpers.serverError);
    }
  }

  static createUserObject([{
    user_id, first_name, last_name, email, is_admin,
  }]) {
    return {
      token: signToken(user_id, email, is_admin),
      user_id,
      first_name,
      last_name,
      email,
      is_admin,
    };
  }
}
