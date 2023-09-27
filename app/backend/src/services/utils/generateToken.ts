import * as jwt from 'jsonwebtoken';
import { IPayloadJWT } from '../../Interfaces/IPayloadJWT';

const generateToken = (payload: IPayloadJWT): string => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET || 'JWT_SECRET');
  return token;
};

export default generateToken;
