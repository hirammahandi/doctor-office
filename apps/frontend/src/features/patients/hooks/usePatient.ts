import { GridRowId, GridSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { CLIENT_ROUTES } from "../../../shared";
import { selectAllPatients, useGetPatientsQuery } from "../slices/patientsApiSlices";
import { setPatientIdsToRemove } from "../slices/patientSlice";

export const usePatient = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading, isError, error, isSuccess } = useGetPatientsQuery();
  const patients = useSelector(selectAllPatients);

  const handlePatientsIds = (ids: GridSelectionModel) => {
    const idsToRemove = Array.from(ids);
    dispatch(setPatientIdsToRemove(idsToRemove));
  };

  const navigateTo = async (patientId: GridRowId) => {
    await router.push(CLIENT_ROUTES.GET_PATIENT.replace("{patientId}", `${patientId}`));
  };

  return {
    values: { isLoading, isError, error, patients, isSuccess },
    actions: { handlePatientsIds, navigateTo },
  };
};
