import * as jwt from 'jsonwebtoken';
import { IPayloadJWT } from '../Interfaces/IPayloadJWT';

class Token {
  private secret: string = process.env.JWT_SECRET || 'secret';

  public validateToken(token: string): IPayloadJWT | null {
    try {
      const decoded = jwt.verify(token, this.secret) as IPayloadJWT;
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

export default Token;
