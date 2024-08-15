import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
}
