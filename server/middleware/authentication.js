import db from '../db/index';
import users from '../model/users';
import bus from '../model/bus';

const { query } = db;
const { findUserByEmail } = users;
const { findBusById } = bus;

export default class Authentication {
  static async isUserExist(req, res, next) {
    const userEmail = req.body.email;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      if (rows.length > 0) {
        return res.status(409).json({ status: 'error', error: 'User already exist' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async notAUser(req, res, next) {
    const userEmail = req.body.email;
    try {
      const { rows } = await query(findUserByEmail, [userEmail]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'User Not Found' });
      }
      req.user = rows;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async isAdmin(req, res, next) {
    if (!req.decoded.admin) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
    }
    return next();
  }

  static async isBusExist(req, res, next) {
    const { bus_id: busId } = req.body;
    try {
      const { rows } = await query(findBusById, [busId]);
      if (rows.length < 1) {
        return res.status(404).json({ status: 'error', error: 'Bus not found' });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
