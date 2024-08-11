import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config/config";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result[0],
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { refreshToken, accessToken, data } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data,
    token: accessToken,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
};
