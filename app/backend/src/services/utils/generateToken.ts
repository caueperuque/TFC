import * as jwt from 'jsonwebtoken';
import { IPayloadJWT } from '../../Interfaces/IPayloadJWT';

const generateToken = (payload: IPayloadJWT): string => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET || 'JWT_SECRET', {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
  return token;
};

export default generateToken;
