import express from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ZodValidations } from "./user.validation";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  validateRequest(ZodValidations.createUserValidation),
  UserControllers.createUser
);


userRouter.post(
  "/signin",
  validateRequest(ZodValidations.loginValidationSchema),
  UserControllers.loginUser
);