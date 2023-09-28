export interface IPayloadJWT {
  email: string;
  role: string;
  username: string;
}

export interface IDecodedJWT {
  payload: {
    id: number;
    username:string;
    role:string;
    email:string;
    password: string;
  },
  iat: number
}
