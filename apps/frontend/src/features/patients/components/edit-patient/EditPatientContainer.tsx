import { useEditPatient } from "../../hooks";
import EditPatientPresenter from "./EditPatientPresenter";

const EditPatientContainer = () => {
  const useEditPatientModel = useEditPatient();

  return <EditPatientPresenter {...useEditPatientModel} />;
};

export default EditPatientContainer;
