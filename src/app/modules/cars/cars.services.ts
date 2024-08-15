import { CarsModel } from "./cars.model";
import { TCars } from "./cars.interfaces";
import { totalHoursCalculate } from "../../utils/totalHOursCalculate";
import { Types, startSession } from "mongoose";
import { BookingsModel } from "../bookings/bookings.model";
import AppError from "../../errors/AppError";

const createCarsIntoDB = async (payload: TCars) => {
  const result = CarsModel.create([payload]);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await CarsModel.find({ isDeleted: false });

  return result;
};

const getSingleCarsFromDB = async (id: string) => {
  const result = await CarsModel.findOne({
    _id: new Types.ObjectId(id),
    isDeleted: false,
  });
  return result;
};

const updateCarsIntoDB = async (id: string, payload: Partial<TCars>) => {
  const result = await CarsModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarsFromDB = async (id: string) => {
  const result = await CarsModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { runValidators: true, new: true }
  );
  return result;
};

const returnAndUpdateCarIntoDB = async (payload: Record<string, string>) => {
  const { bookingId, endTime } = payload;

  const session = await startSession();
  try {
    await session.startTransaction();

    const bookings = await BookingsModel.findByIdAndUpdate(
      bookingId,
      { endTime: endTime },
      { session, new: true, runValidators: true }
    ).populate("user car");

    await CarsModel.updateOne(
      { _id: bookings?.car },
      { status: "available" },
      { runValidators: true, session }
    );

    const totalHours = totalHoursCalculate(
      bookings?.startTime!,
      bookings?.endTime!
    );

    const car: TCars = bookings?.car as TCars;
    const pricePerHour = car?.pricePerHour;

    await BookingsModel.findByIdAndUpdate(
      bookingId,

      {
        $set: {
          totalCost: pricePerHour * totalHours,
        },
      },

      { session, runValidators: true }
    );

    await session.commitTransaction();

    const result = await BookingsModel.findById(bookings?._id).populate(
      "user car"
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(501, `${(error as Error).message}`);
  } finally {
    await session.endSession();
  }
};

export const CarsServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateCarsIntoDB,
  deleteCarsFromDB,
  returnAndUpdateCarIntoDB,
};
