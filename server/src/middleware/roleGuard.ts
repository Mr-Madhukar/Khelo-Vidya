import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';
import { UserRole } from '../types/index.js';

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized: authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        error: `Forbidden: role '${req.user.role}' is not authorized for this resource` 
      });
      return;
    }

    next();
  };
};
