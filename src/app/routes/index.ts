import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { carsRouter } from "../modules/cars/cars.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRouter,
  },

  {
    path: "/cars",
    route: carsRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
