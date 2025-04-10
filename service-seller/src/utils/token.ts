import jwt from "jsonwebtoken";

function createToken(params: object, expires?: string) {
  const secretKey: jwt.Secret = process.env.AGENT_JWT_KEY as string;

  const defaultTime: any = process.env.TOKEN_EXPIRATION as string;

  const options: jwt.SignOptions = {
    expiresIn: expires || defaultTime,
  };

  return jwt.sign(params, secretKey, options);
}

export { createToken };
