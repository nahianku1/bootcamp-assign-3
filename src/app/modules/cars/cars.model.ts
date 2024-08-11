import { Schema, model } from "mongoose";
import { TCars } from "./cars.interfaces";

export const carsSchema = new Schema<TCars>(
  {
    name: {
      type: String,
      required: true, // This makes the field required
      trim: true, // This will remove leading and trailing whitespaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures the email is unique
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Email validation regex
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "user"],
        message: `{VALUE} is not  supported`,
      }, // Example enum, adjust based on your needs
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Ensures a minimum length of 8 characters
      maxlength: 128, // Ensures a maximum length of 128 characters
      default: "password123", // Default value as mentioned in the interface
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"], // Example regex for a 10-digit phone number
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CarsModel = model<TCars>("Cars", carsSchema);
