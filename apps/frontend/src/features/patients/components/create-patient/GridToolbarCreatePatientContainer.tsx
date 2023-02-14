import { useCreatePatient } from "../../hooks";
import GridToolbarCreatePatientPresenter from "./GridToolbarCreatePatientPresenter";

const GridToolbarCreatePatientContainer = () => {
  const createPatientModel = useCreatePatient();
  return <GridToolbarCreatePatientPresenter {...createPatientModel} />;
};

export default GridToolbarCreatePatientContainer;
