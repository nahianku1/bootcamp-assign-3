import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { bookingsRouter } from "../modules/bookings/bookings.routes";

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

  {
    path: "/bookings",
    route: bookingsRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
