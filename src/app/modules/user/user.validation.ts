import { z } from "zod";
import { TUser } from "./user.interfaces";

export const createUserValidation = z.object({
  name: z.string({
    required_error: `Name is required!`,
    invalid_type_error: `Invalid Name!`,
  }),
  email: z
    .string({
      required_error: `Email is required!`,
      invalid_type_error: `Invalid email!`,
    })
    .email({ message: `Invalid email address!` }),
  role: z
    .enum(["admin", "user"])
    .refine((value) => value === "admin" || value === "user", {
      message: "Invalid role! Must be one of 'admin', or 'user'.",
    }),
  password: z.string({
    required_error: `Password is required!`,
    invalid_type_error: `Invalid password!`,
  }),
  phone: z
    .string({
      required_error: `Phone is required!`,
      invalid_type_error: `Invalid Phone!`,
    })
    .refine((value) => /^\d{11}$/.test(value), {
      message: "Mobile number must be a 11-digit number.",
    }),
  address: z.string({
    required_error: `Address is required!`,
    invalid_type_error: `Invalid Address!`,
  }),
});

export const updateUserValidation = createUserValidation.partial();

export const ZodValidations = { createUserValidation, updateUserValidation };
