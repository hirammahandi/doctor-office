import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    newPassword: z.string().nullable(),
    confirmPassword: z.string().nullable(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const keysUpdateProfileSchema = updateProfileSchema._def.schema.keyof();
