import bcrypt from 'bcryptjs';

export default class PasswordUtils {
  static hashPassword(userPassword) {
    return bcrypt.hash(userPassword, 10);
  }
}
