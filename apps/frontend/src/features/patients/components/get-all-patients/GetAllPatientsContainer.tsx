import { usePatient } from "../../hooks";
import GetAllPatientsPresenter from "./GetAllPatientsPresenter";

const GetAllPatientsContainer = () => {
  const patientsModel = usePatient();

  return <GetAllPatientsPresenter {...patientsModel} />;
};

export default GetAllPatientsContainer;
