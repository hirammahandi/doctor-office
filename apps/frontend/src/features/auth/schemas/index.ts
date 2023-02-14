import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email is must be a string",
      required_error: "Name is required",
    })
    .email(),
  password: z
    .string({
      invalid_type_error: "Password is must be a string",
      required_error: "Password is required",
    })
    .min(5, "Password must contain at least 5 character(s)"),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string({
      invalid_type_error: "Name bust be a string",
      required_error: "Name is required",
    })
    .min(1, "Name must contain at least 1 character(s)"),
  lastName: z
    .string({
      invalid_type_error: "Name bust be a string",
      required_error: "Name is required",
    })
    .min(1, "Last Name must contain at least 1 character(s)"),
});

export const keysLoginSchema = loginSchema.keyof();
export const keysSignupSchema = signupSchema.keyof();
