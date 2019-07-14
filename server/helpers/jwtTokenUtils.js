import jwt from 'jsonwebtoken';

export default class JwtToken {
  static signToken(userId, userEmail, isAdmin) {
    const key = process.env.SECRET_KEY;
    const token = `Bearer ${jwt.sign({ id: userId, email: userEmail, admin: isAdmin }, key, { expiresIn: '1h' })}`;
    return token;
  }

  static verifyToken(req, res, next) {
    const key = process.env.SECRET_KEY;
    const tokenHeaders = req.headers.authorization;
    if (!tokenHeaders) {
      return res.status(403).json({ status: 'error', error: 'No token provided' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const options = {
      expiresIn: '1h',
    };
    jwt.verify(token, key, options, (error, decoded) => {
      if (error) {
        return res.status(401).json({ status: 'error', error: 'Invalid token provided' });
      }
      req.decoded = decoded;
      return req.decoded;
    });
    return next();
  }
}
