import { Response } from "express";
import { ResponseData } from "../interfaces/app.types";

export function sendResponse<T>(res: Response, data: ResponseData<T>) {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    token: data.token,
  });
}
