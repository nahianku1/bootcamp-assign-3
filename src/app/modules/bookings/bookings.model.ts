import { Schema, SchemaTypes, Types, model } from "mongoose";
import { TBookings } from "./bookings.interfaces";

export const bookingsSchema = new Schema<TBookings>(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:MM (24-hour) format",
      ],
    },
    endTime: {
      type: String,
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:MM (24-hour) format",
      ],
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Cars",
    },
    totalCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, status, password, isDeleted, ...rest } = ret;
        return { _id, ...rest };
      },
    },
  }
);

export const BookingsModel = model<TBookings>("Bookings", bookingsSchema);
