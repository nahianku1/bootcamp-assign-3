import { z } from "zod";

export const createBookingsValidation = z.object({
  carId: z.string().nonempty("Car ID cannot be empty"), // Must be a non-empty string
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date format. Must be in YYYY-MM-DD format.",
  }), // Validates the date format YYYY-MM-DD
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format. Must be in HH:MM (24-hour) format.",
  }), // Validates time format HH:MM (24-hour format)
});

export const updateBookingsValidation = createBookingsValidation.partial();

export const BookingsValidations = {
  createBookingsValidation,
  updateBookingsValidation,
};
