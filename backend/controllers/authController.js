import { z } from 'zod';
import User from '../models/User.js';
import { generateJwt } from '../utils/generateToken.js';
import { StatusCodes } from 'http-status-codes';

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const setAuthCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = registerSchema.parse(req.body);

    const exists = await User.findOne({ email });
    if (exists) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already in use' });

    const user = await User.create({ fullName, email, password });
    const token = generateJwt({ id: user._id });
    setAuthCookie(res, token);

    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

    const token = generateJwt({ id: user._id });
    setAuthCookie(res, token);

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('token', { httpOnly: true, secure: isProd, sameSite: isProd ? 'none' : 'lax' });
  res.json({ message: 'Logged out' });
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) { next(err); }
};