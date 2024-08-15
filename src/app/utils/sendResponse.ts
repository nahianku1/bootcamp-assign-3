import { Response } from "express";
import { ResponseData } from "../interfaces/app.types";

function isDataEmpty<T>(data: T) {
  if (Array.isArray(data)) {
    if (data.length) {
      return true;
    } else {
      return false;
    }
  } else {
    if (data instanceof Object && data !== null && !Array.isArray(data)) {
      if (Object.keys(data).length) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}

export function sendResponse<T>(res: Response, data: ResponseData<T>) {
  res.status(isDataEmpty(data.data) ? data.statusCode : 404).json({
    success: isDataEmpty(data.data) ? data.success : false,
    statusCode: isDataEmpty(data.data) ? data.statusCode : 404,
    message: isDataEmpty(data.data) ? data.message : "No Data Found",
    data: data.data,
    token: data.token,
  });
}
