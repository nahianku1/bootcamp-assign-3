import { BookingsModel } from "./bookings.model";
import { TBookings } from "./bookings.interfaces";
import mongoose, { Types, startSession } from "mongoose";
import { CarsServices } from "../cars/cars.services";
import { CarsModel } from "../cars/cars.model";
import AppError from "../../errors/AppError";
import { totalHoursCalculate } from "../../utils/totalHOursCalculate";
import { TCars } from "../cars/cars.interfaces";

const getAllBookingsFromDB = async (id: string, date: string) => {
  const carId = new mongoose.Types.ObjectId(id);
  const result = await BookingsModel.find({ car: carId, date: date }).populate(
    "user car"
  );

  return result;
};

const createBookingsIntoDB = async (id: string, payload: TBookings) => {
  const { carId, ...rest } = payload;
  const finalPayload = { ...rest, user: id, car: carId };

  const session = await startSession();
  try {
    await session.startTransaction();
    const { status }: TCars = await CarsModel.findById(carId).select("status");

    if (status === "unavailable") {
      throw new AppError(404, `Car not available to book`);
    }

    const bookings = await BookingsModel.create([finalPayload], { session });

    await CarsModel.findByIdAndUpdate(
      carId,
      { status: "unavailable" },
      { runValidators: true, session }
    );

    await session.commitTransaction();

    const bookingId = bookings[0]?._id
      .toString()
      .split("'")[0]
      .replace("'", "");
    const result = await BookingsModel.findById(bookingId).populate("user car");
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(501, `${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
};

const getMyBookingsFromDB = async (id: string) => {
  const userId = new mongoose.Types.ObjectId(id);
  const result = await BookingsModel.find({ user: userId }).populate(
    "user car"
  );

  return result;
};

export const BookingsServices = {
  getAllBookingsFromDB,
  createBookingsIntoDB,
  getMyBookingsFromDB,
};
