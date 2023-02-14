import React from "react";
import GetMedicalRecordsByPatientPresenter from "./GetMedicalRecordsByPatientPresenter";
import { useGetMedicalRecordsByPatient } from "../../hooks";

const GetMedicalRecordsByPatientContainer = () => {
  const getMedicalRecordsByPatientModel = useGetMedicalRecordsByPatient();
  return <GetMedicalRecordsByPatientPresenter {...getMedicalRecordsByPatientModel} />;
};

export default GetMedicalRecordsByPatientContainer;
