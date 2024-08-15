import { Types } from "mongoose";
import { TCars } from "../cars/cars.interfaces";

export type TBookings = {
  _id: Types.ObjectId;
  carId: string;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  car: Types.ObjectId | TCars;
  totalCost: number;
};
