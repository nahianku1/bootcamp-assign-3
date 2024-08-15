import { Response } from "express";
import { ResponseData } from "../interfaces/app.types";
import { isDataEmpty } from "./isDataEmpty";



export function sendResponse<T>(res: Response, data: ResponseData<T>) {
  res.status(isDataEmpty(data.data) ? data.statusCode : 404).json({
    success: isDataEmpty(data.data) ? data.success : false,
    statusCode: isDataEmpty(data.data) ? data.statusCode : 404,
    message: isDataEmpty(data.data) ? data.message : "No Data Found",
    data: isDataEmpty(data.data) ? data.data : [],
    token: data.token,
  });
}
