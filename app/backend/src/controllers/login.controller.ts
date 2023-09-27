import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  private loginService: LoginService = new LoginService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.loginService.login(String(email), String(password));

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return res.status(200).json({ token: user.data });
  }
}

export default LoginController;
