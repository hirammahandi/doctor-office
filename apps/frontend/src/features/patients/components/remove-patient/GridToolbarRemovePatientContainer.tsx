import { useRemovePatient } from "../../hooks/useRemovePatient";
import GridToolbarRemovePatientPresenter from "./GridToolbarRemovePatientPresenter";

const GridToolbarRemovePatientContainer = () => {
  const removePatientsModel = useRemovePatient();

  return <GridToolbarRemovePatientPresenter {...removePatientsModel} />;
};

export default GridToolbarRemovePatientContainer;
