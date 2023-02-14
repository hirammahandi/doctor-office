import React from "react";
import { useCreateMedicalRecord } from "../../hooks";
import CreateMedicalRecordPresenter from "./CreateMedicalRecordPresenter";

const CreateMedicalRecordContainer = () => {
  const createClinicalHistoryModel = useCreateMedicalRecord();
  return <CreateMedicalRecordPresenter {...createClinicalHistoryModel} />;
};

export default CreateMedicalRecordContainer;
