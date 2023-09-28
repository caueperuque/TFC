import * as bcrypt from 'bcryptjs';
import Token from '../entities/Token';
import LoginModel from '../database/models/UsersModel';
import generateToken from './utils/generateToken';
import { IServiceResponse } from '../Interfaces/IServiceResponse';
import { IToken } from '../Interfaces/IToken';

class LoginService {
  private loginModel = LoginModel;
  private token = new Token();

  public async login(email: string, password: string): Promise<IServiceResponse<IToken>> {
    const user = await this.loginModel.findOne({
      where: { email },
    });

    if (!user) return { status: 'INVALID' };

    const passwordCompare = bcrypt.compareSync(password, user?.dataValues.password);

    if (!passwordCompare) {
      return { status: 'INVALID' };
    }

    const token = generateToken(user);

    return { status: 'SUCCESSFUL', data: token };
  }
}
export default LoginService;
