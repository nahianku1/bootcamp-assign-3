import { RequestHandler } from "express";
import { CarsServices } from "./cars.services";
import { sendResponse } from "../../utils/sendResponse";

const createCars: RequestHandler = async (req, res, next) => {
  try {
    const result = await CarsServices.createCarsIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Cars created successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllCarss: RequestHandler = async (req, res, next) => {
  try {
    const result = await CarsServices.getAllCarssFromDB(req.query);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "All carss are retrieved successfully!",
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
      message: "Single cars is retrieved successfully!",
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
      message: "Cars is updated successfully!",
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
      message: "Cars is deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const CarsControllers = {
  createCars,
  getAllCarss,
  getSingleCars,
  updateCars,
  deleteSingleCars,
};
