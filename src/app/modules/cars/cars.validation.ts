import { z } from "zod";

export const createCarsValidation = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  color: z.string().trim().min(1, "Color is required"),
  isElectric: z.boolean(),
  features: z
    .array(z.string().trim().min(1))
    .nonempty("Features cannot be empty"), // Ensures the array is not empty and all strings are non-empty
  pricePerHour: z.number(),
});

export const updateCarsValidation = createCarsValidation.partial();

export const CarsValidations = { createCarsValidation, updateCarsValidation };
