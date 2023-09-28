import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import LoginService from '../services/login.service';
import { IDecodedJWT } from '../Interfaces/IPayloadJWT';

class LoginController {
  private loginService: LoginService = new LoginService();

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.loginService.login(String(email), String(password));

    if (user.status === 'INVALID') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token: user.data });
  }

  public static getRoleUser(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const [, token] = authorization.split('Bearer ');

    const decoded = jwt.decode(token) as IDecodedJWT | null;
    console.log(decoded);

    // console.log(jwt.verify(authorization, process.env.JWT_SECRET || 'JWT_SECRET'));

    if (!decoded || !decoded.payload) {
      return res.status(401).json({ message: 'Invalid tokens' });
    }

    const { role } = decoded.payload;
    return res.status(200).json({ role });
  }
}

export default LoginController;
