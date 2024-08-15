import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../errors/AppError";

export const createToken = (
  jwtPayload: { id: string; email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, `You are unauthorized!`);
  }
};

export const isPasswordMatched = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};


