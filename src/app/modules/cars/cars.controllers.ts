import { RequestHandler } from "express";
import { CarsServices } from "./cars.services";
import { sendResponse } from "../../utils/sendResponse";

const createCars: RequestHandler = async (req, res, next) => {
  try {
    const result = await CarsServices.createCarsIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Car created successfully",
      data: result[0],
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllCars: RequestHandler = async (req, res, next) => {
  try {
    const result = await CarsServices.getAllCarsFromDB();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Cars retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getSingleCars: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await CarsServices.getSingleCarsFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "A Car retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateCars: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await CarsServices.updateCarsIntoDB(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Car updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteSingleCars: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await CarsServices.deleteCarsFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Car Deleted successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const CarsControllers = {
  createCars,
  getAllCars,
  getSingleCars,
  updateCars,
  deleteSingleCars,
};
