import { NextFunction, Request, Response } from 'express';

class Validations {
  public static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as { email: string, password: string };
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = regex.test(email);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!isValidEmail || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default Validations;
