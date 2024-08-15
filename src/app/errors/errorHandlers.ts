import mongoose from "mongoose";
import { ZodError, ZodIssue } from "zod";
import {
  TErrorSource,
  TErrorSourceReturnType,
} from "../interfaces/error.interfaces";

export const handleZodError = (err: ZodError): TErrorSourceReturnType => {
  const statusCode = 400;
  const message = `Zod validation Error!`;
  const errorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path.at(-1)!,
      message: issue.message,
    };
  });
  return {
    statusCode,
    message,
    errorMessages,
  };
};

export const handleMongoValidationError = (
  err: mongoose.Error.ValidationError
): TErrorSourceReturnType => {
  const statusCode = 400;
  const message = `Mongoose validation Error!`;

  const errorMessages = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path!,
        message: value.message,
      };
    }
  );

  return {
    statusCode,
    message,
    errorMessages,
  };
};

const modifiedCastError = (msg: string) => {
  return msg.split(`(`)[0].replace(/"([^"]+)"/g, "$1");
};

export const handleCastError = (
  err: mongoose.Error.CastError
): TErrorSourceReturnType => {
  const statusCode = 400;
  const message = `Mongoose Cast Error!`;
  // Cast to ObjectId failed for value \"fghfghfgh\"

  const errorMessages = [
    {
      path: err?.path,
      message: modifiedCastError(err?.message),
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export const handleDuplicateError = (err: any): TErrorSourceReturnType => {

  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorMessages: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: `Mongoose unique value error!`,
    errorMessages,
  };
};
