import jwt from "jsonwebtoken";

export function createToken(params: object, expires?: string) {
  const secretKey: jwt.Secret = process.env.AGENT_JWT_KEY as string;

  const defaultTime: any = process.env.TOKEN_EXPIRATION as string;

  const options: jwt.SignOptions = {
    expiresIn: expires || defaultTime,
  };

  return jwt.sign(params, secretKey, options);
}

/**Verifies JWT token, without error handler*/
export function verifyToken(token: string, key: string): any {
  try {
    return jwt.verify(token, key);
  } catch (err: any) {
    return null;
  }
}

export interface SellerEmailRegistrationToken {
  source: "service-seller";
  role: "SELLER";
  email: string;
  username: string;
}
