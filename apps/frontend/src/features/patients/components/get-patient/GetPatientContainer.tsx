import { useGetPatient } from "../../hooks";
import GetPatientPresenter from "./GetPatientPresenter";

const GetPatientContainer = () => {
  const getPatientModel = useGetPatient();
  return <GetPatientPresenter {...getPatientModel} />;
};

export default GetPatientContainer;
