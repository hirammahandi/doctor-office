import { GridColumns } from "@mui/x-data-grid";
import { z } from "zod";
import { createPatientSchema, editPatientSchema, keysSchema } from "../schemas";

export type ColumnDataType<T extends object> = {
  [Key in keyof GridColumns<T>[number]]: Key extends "field"
    ? keyof T
    : GridColumns<T>[number][Key];
}[];

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;
export type EditPatientSchema = z.infer<typeof editPatientSchema>;

export type KeyofCreatePatientSchema = z.infer<typeof keysSchema>;
