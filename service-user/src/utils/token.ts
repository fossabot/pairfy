import jwt from "jsonwebtoken";

function createToken(params: object) {
  const secretKey: jwt.Secret = process.env.AGENT_JWT_KEY as string;

  const expirationTime: any = process.env.TOKEN_EXPIRATION as string;

  const options: jwt.SignOptions = {
    expiresIn: expirationTime,
  };

  return jwt.sign(params, secretKey, options);
}

export { createToken };
