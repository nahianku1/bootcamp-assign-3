import { z } from "zod";

export const createCarsValidation = z.object({});

export const updateCarsValidation = createCarsValidation.partial();

export const CarsValidations = { createCarsValidation, updateCarsValidation };
