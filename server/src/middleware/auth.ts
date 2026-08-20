import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { JWTPayload } from '../types/index.js';

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, error: 'Authentication required. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch (_err) {
    res.status(403).json({ success: false, error: 'Invalid or expired authentication token.' });
    return;
  }
};
