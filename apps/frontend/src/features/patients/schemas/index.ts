import { z } from "zod";

export const createPatientSchema = z
  .object({
    ci: z
      .string({
        required_error: "CI is required",
      })
      .length(11)
      .refine((value) => /^[0-9]+$/.test(value), "Must contain only numbers"),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1),
    lastName: z
      .string({
        required_error: "Name is required",
      })
      .min(1),
    email: z.string().email(),
    address: z.string().min(1),
  })
  .required();

export const editPatientSchema = createPatientSchema.extend({
  id: z.number(),
});

export const keysSchema = createPatientSchema.keyof();
