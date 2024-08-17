import express from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ZodValidations } from "./user.validation";

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 *
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user account.
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: johndoe
 *                 description: Unique username for the user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd
 *                 description: Password for the user account
 *               phone:
 *                 type: string
 *                 pattern: "^[0-9]{11}$"
 *                 example: "01779137137"
 *                 description: Phone for the user
 *               role:
 *                 type: string
 *                 example: user
 *                 description: Role for the user
 *               address:
 *                 type: string
 *                 example: khulna,Daulatpur
 *                 description: Address for the user
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f191e810c19729de860ea
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */

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
