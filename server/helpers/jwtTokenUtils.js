import jwt from 'jsonwebtoken';
import responseHelper from './responseHelper';
import status from './status';
import errorHelpers from './errorHelpers';

const { responseError } = responseHelper;

export default class JwtToken {
  static signToken(userId, userEmail, isAdmin) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userId, email: userEmail, admin: isAdmin }, key, { expiresIn: '1h' });
    return token;
  }

  static verifyToken(req, res, next) {
    const key = process.env.SECRET_KEY;
    const tokenHeaders = req.headers.token;
    if (!tokenHeaders) {
      return responseError(res, status.forbidden, errorHelpers.noToken);
    }
    jwt.verify(tokenHeaders, key, (error, decoded) => {
      if (error) {
        return responseError(res, status.unauthorizedAccess, errorHelpers.invalidToken);
      }
      req.decoded = decoded;
      return req.decoded;
    });
    return next();
  }
}
