import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';


export const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized, token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not authorized, token invalid' });
  }
};
