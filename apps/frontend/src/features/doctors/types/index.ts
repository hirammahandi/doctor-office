import { IDoctor } from "@common/lib";
import { z } from "zod";
import { keysUpdateProfileSchema, updateProfileSchema } from "../schema";

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export type KeyofUpdateProfileSchema = z.infer<typeof keysUpdateProfileSchema>;

export type UpdateDoctorBody = Partial<Omit<IDoctor, "patients">>;
