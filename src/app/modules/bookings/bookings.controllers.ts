import { RequestHandler } from "express";
import { BookingsServices } from "./bookings.services";
import { sendResponse } from "../../utils/sendResponse";

const getAllBookings: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingsServices.getAllBookingsFromDB(
      req.query.carId as string,
      req.query.date as string
    );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const createBookings: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await BookingsServices.createBookingsIntoDB(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Car booked successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getMyBookings: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookingsServices.getMyBookingsFromDB(req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "My Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const BookingsControllers = {
  getAllBookings,
  createBookings,
  getMyBookings,
};
