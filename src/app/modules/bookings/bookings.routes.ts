import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../interfaces/app.types";
import { BookingsControllers } from "./bookings.controllers";
import { BookingsValidations } from "./bookings.validation";

export const bookingsRouter = express.Router();

bookingsRouter.get(
  "/",
  auth(USER_ROLE.admin),
  BookingsControllers.getAllBookings
);


bookingsRouter.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingsValidations.createBookingsValidation),
  BookingsControllers.createBookings
);

bookingsRouter.get(
  "/my-bookings",
  auth( USER_ROLE.user),
  BookingsControllers.getMyBookings
);


