import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT = 10;
const SECRET = process.env.JWT_SECRET || 'default_secret';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT);
};

export const comparePassword = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};

export const generateToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '15m' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as { userId: string };
};