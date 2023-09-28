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

    if (!user) return { status: 'INVALID' };

    // ---------- CRIAR UM MIDDLEWARE -----------

    const passwordCompare = bcrypt.compareSync(password, user?.dataValues.password);
    console.log(passwordCompare);

    if (!passwordCompare) {
      return { status: 'INVALID' };
    }

    const token = generateToken(user);

    console.log(user.dataValues);

    return { status: 'SUCCESSFUL', data: token };
  }
}

export default LoginService;
