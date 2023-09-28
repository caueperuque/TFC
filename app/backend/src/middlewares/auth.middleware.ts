import { NextFunction, Request, Response } from 'express';
import Token from '../entities/Token';

const jwtUtils = new Token();

class ValidateToken {
  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    try {
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const [, token] = authorization.split('Bearer ');

      // console.log(token);
      const decoded = jwtUtils.validateToken(token);

      // console.log(decoded);

      if (!decoded) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default ValidateToken;
