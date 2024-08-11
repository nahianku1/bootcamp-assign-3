import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "../auth/auth.interfaces";
import { TUser } from "./user.interfaces";
import { UserModel } from "./user.model";
import { createToken, isPasswordMatched } from "../auth/auth.utils";
import config from "../../config/config";

const createUserIntoDB = async (payload: TUser) => {
  console.log(payload);

  const result = UserModel.create([payload]);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //   // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //   // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  //   //checking if the password is correct

  if (!(await isPasswordMatched(payload?.password, user?.password as string)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //   //create token and sent to the  client

  const jwtPayload = {
    email: user?.email as string,
    role: user?.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expiry as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expiry as string
  );

  return {
    data: user,
    accessToken,
    refreshToken,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
