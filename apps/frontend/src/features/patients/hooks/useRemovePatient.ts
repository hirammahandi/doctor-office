import { StatusCodes } from "http-status-codes";
import router from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks";
import { removeToken } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { useRemovePatientsMutation } from "../slices/patientsApiSlices";
import {
  selectPatientsIdsToRemove,
  setPatientIdsToRemove,
} from "../slices/patientSlice";

export const useRemovePatient = () => {
  const patientsIds = useSelector(selectPatientsIdsToRemove);
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [removePatients, { isLoading, isError, isSuccess, error }] =
    useRemovePatientsMutation();

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleRemovePatient = async () => {
    try {
      await removePatients(patientsIds).unwrap();
    } catch (error) {
      const errorData = isInstanceOfFetchBaseQueryError(error)
        ? getErrorData(error)
        : null;

      if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) {
        removeToken();
        return await router.push(CLIENT_ROUTES.SIGNIN);
      }
      const message =
        errorData?.statusCode === StatusCodes.NOT_FOUND
          ? errorData.message
          : "An error has occurred. Try again";

      toast.error(message, {
        position: "bottom-right",
      });
    }
    dispatch(setPatientIdsToRemove([]));
    handleCloseDialog();
  };

  return {
    values: { openDialog, patientsIds, isLoading, isError, isSuccess, error },
    actions: {
      handleRemovePatient,
      handleCloseDialog,
      handleOpenDialog,
    },
  };
};
