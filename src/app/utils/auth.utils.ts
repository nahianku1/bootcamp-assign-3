import { Response } from "express";
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

export const verifyToken = (res: Response, token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }
};

export const isPasswordMatched = async (
  plainPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
