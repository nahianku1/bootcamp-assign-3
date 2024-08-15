import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../interfaces/app.types";
import { CarsControllers } from "./cars.controllers";
import { CarsValidations } from "./cars.validation";

export const carsRouter = express.Router();

carsRouter.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CarsValidations.createCarsValidation),
  CarsControllers.createCars
);

carsRouter.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CarsControllers.getAllCars
);

carsRouter.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CarsControllers.getSingleCars
);

carsRouter.put(
  "/return",
  auth(USER_ROLE.admin),
  validateRequest(CarsValidations.returnCarValidation),
  CarsControllers.returnCar
);

carsRouter.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CarsValidations.updateCarsValidation),
  CarsControllers.updateCars
);

carsRouter.delete(
  "/:id",
  auth(USER_ROLE.admin),
  CarsControllers.deleteSingleCars
);
