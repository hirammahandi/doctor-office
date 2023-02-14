import { IPatient } from "@common/lib";

export const selectedPatientColumns: Record<keyof Omit<IPatient, "doctor">, true> = {
  address: true,
  ci: true,
  medicalRecords: true,
  createdAt: true,
  email: true,
  id: true,
  lastName: true,
  name: true,
  updatedAt: true,
};
