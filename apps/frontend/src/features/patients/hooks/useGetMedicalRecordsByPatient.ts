import { useSelector } from "react-redux";
import { selectMedicalRecordsByPatient, selectPatientFullName } from "../slices/patientSlice";
import { ChangeEventHandler } from "react";

export const useGetMedicalRecordsByPatient = () => {
  const medicalRecords = useSelector(selectMedicalRecordsByPatient);
  const patientFullName = useSelector(selectPatientFullName);

  const handleChangeSearchDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
  };

  return {
    values: { medicalRecords, patientFullName },
    actions: { handleChangeSearchDate },
  };
};
