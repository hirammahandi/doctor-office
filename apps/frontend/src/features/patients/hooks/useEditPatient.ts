import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { removeToken } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { selectPatient } from "../slices/patientSlice";
import { useEditPatientMutation } from "../slices/patientsApiSlices";
import { EditPatientSchema, KeyofCreatePatientSchema } from "../types";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPatientSchema } from "../schemas";

export const useEditPatient = () => {
  const router = useRouter();
  const patientToEdit = useSelector(selectPatient);
  const [editPatient, { isError, isLoading, isSuccess, error: errorResponse }] =
    useEditPatientMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditPatientSchema>({
    defaultValues: { ...patientToEdit },
    resolver: zodResolver(editPatientSchema),
  });

  const watchAllFields = watch();

  const isDisabledToEdit = useMemo(
    () =>
      Object.keys(watchAllFields).every(
        (key) =>
          watchAllFields[key as keyof EditPatientSchema] ===
          patientToEdit?.[key as keyof EditPatientSchema]
      ),
    [patientToEdit, watchAllFields]
  );

  const handleEditPatient = async (data: EditPatientSchema) => {
    try {
      await editPatient(data).unwrap();
    } catch (error) {
      const errorData = isInstanceOfFetchBaseQueryError(error) ? getErrorData(error) : null;

      if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) {
        removeToken();
        return await router.push(CLIENT_ROUTES.SIGNIN);
      }
      if (errorData?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
        const message = errorData.message;
        const errorKey = getErrorsKey<KeyofCreatePatientSchema>(message, "email", "ci");
        if (errorKey) setError(errorKey, { type: "validate" });
      }
    }
  };

  return {
    value: {
      patientToEdit,
      errors,
      isError,
      isLoading,
      errorResponse,
      isSuccess,
      isDisabledToEdit,
    },
    actions: { register, handleSubmit, handleEditPatient },
  };
};
