import { IPatient } from "@common/lib";

export const getPatientDataToEditAndMedicalRecords = (payload: IPatient) => {
  const { medicalRecords, createdAt, updatedAt, ...restPatientToEdit } = payload;
  return {
    medicalRecords,
    patientToEdit: restPatientToEdit,
  };
};
