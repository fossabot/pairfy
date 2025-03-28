import jwt from "jsonwebtoken";

const createToken = (params: any) => {
  const secretKey: string = process.env.AGENT_JWT_KEY as string;
  const expiresIn: string = process.env.TOKEN_EXPIRATION as string;

  return jwt.sign(params, secretKey, {
    expiresIn,
  });
};

export { createToken };
