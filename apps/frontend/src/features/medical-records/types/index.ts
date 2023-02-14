import { z } from "zod";
import { createMedicalRecordSchema, keysCreateMedicalRecordSchema } from "../schema";

export type CreateMedicalRecordSchema = z.infer<typeof createMedicalRecordSchema>;

export type KeyofCreateMedicalRecordSchema = z.infer<typeof keysCreateMedicalRecordSchema>;
