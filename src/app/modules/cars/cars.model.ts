import { Schema, model } from "mongoose";
import { TCars } from "./cars.interfaces";

export const carsSchema = new Schema<TCars>(
  {
    name: {
      type: String,
      required: true, // This makes the field required
      trim: true, // Removes leading and trailing whitespaces
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    features: {
      type: [String], // Array of strings
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length > 0; // Ensure the array is not empty
        },
        message: "Features array cannot be empty",
      },
      trim: true, // Applies trim to each string in the array
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["available", "unavailable"],
        message: `{VALUE} is not supported!`,
      },
      default: "available",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        const { _id,  ...rest } = ret;
        return { _id, ...rest };
      },
    },
  }
);

export const CarsModel = model<TCars>("Cars", carsSchema);
