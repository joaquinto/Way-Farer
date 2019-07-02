import jwt from 'jsonwebtoken';

export default class JwtToken {
  static signToken(userId, userEmail, isAdmin) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userId, email: userEmail, admin: isAdmin }, key, { expiresIn: '1h' });
    return token;
  }
}
