import jwt from 'jsonwebtoken';

export default class JwtToken {
  static signToken(userId, userEmail, isAdmin) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userId, email: userEmail, admin: isAdmin }, key, { expiresIn: '1h' });
    return token;
  }

  static verifyToken(req, res, next) {
    const key = process.env.SECRET_KEY;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ status: 'error', error: 'No token provided' });
    }
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        return res.status(401).json({ status: 'error', error: 'Invalid token provided' });
      }
      req.decoded = decoded;
      return req.decoded;
    });
    return next();
  }
}
