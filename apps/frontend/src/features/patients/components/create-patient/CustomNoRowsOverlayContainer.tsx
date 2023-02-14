import { useCreatePatient } from "../../hooks";
import CustomNoRowsOverlayPresenter from "./CustomNoRowsOverlayPresenter";

const CustomNoRowsOverlayContainer = () => {
  const createPatientModel = useCreatePatient();

  return <CustomNoRowsOverlayPresenter {...createPatientModel} />;
};

export default CustomNoRowsOverlayContainer;
