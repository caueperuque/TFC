import * as bcrypt from 'bcryptjs';
import { IServiceResponse } from '../Interfaces/IServiceResponse';
import LoginModel from '../database/models/UsersModel';
import generateToken from './utils/generateToken';
import { IToken } from '../Interfaces/IToken';

class LoginService {
  private loginModel = LoginModel;

  public async login(email: string, password: string): Promise<IServiceResponse<IToken>> {
    const user = await this.loginModel.findOne({
      where: { email },
    });
    if (!user) return { status: 'NOT_FOUND' };

    // ---------- CRIAR UM MIDDLEWARE -----------

    const passwordCompare = await bcrypt.compare(password, user?.dataValues.password);

    if (!passwordCompare) {
      return { status: 'NOT_FOUND' };
    }

    const token = generateToken(user);

    return { status: 'SUCCESSFUL', data: token };
  }
}

export default LoginService;
