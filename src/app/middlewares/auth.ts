import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config/config";
import { UserModel } from "../modules/user/user.model";
import { TUserRole } from "../interfaces/app.types";
import { TUser } from "../modules/user/user.interfaces";
import { verifyToken } from "../utils/auth.utils";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // checking if the token is missing
    if (!token) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }

    // checking if the given token is valid
    const verifiedToken = verifyToken(
      res,
      token as string,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = verifiedToken;

    // checking if the user is exist
    const user = (await UserModel.find({ email: email })) as unknown as TUser;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }

    req.user = verifiedToken;
    next();
  });
};

export default auth;
