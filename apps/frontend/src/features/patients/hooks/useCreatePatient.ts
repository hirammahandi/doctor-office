import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { removeToken } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { createPatientSchema } from "../schemas";
import { useCreatePatientMutation } from "../slices/patientsApiSlices";
import { CreatePatientSchema, KeyofCreatePatientSchema } from "../types";

const defaultValues: CreatePatientSchema = {
  ci: "",
  name: "",
  lastName: "",
  email: "",
  address: "",
};

export const useCreatePatient = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createPatientSchema),
  });
  const [createPatient, { isError, isLoading, error: errorResponse }] =
    useCreatePatientMutation();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreatePatient = useCallback(
    async (data: CreatePatientSchema) => {
      try {
        const response = await createPatient(data).unwrap();
        if (response.success) {
          reset();
          handleCloseModal();
        }
      } catch (error) {
        const errorData = isInstanceOfFetchBaseQueryError(error)
          ? getErrorData(error)
          : null;

        if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) {
          removeToken();
          return await router.push(CLIENT_ROUTES.SIGNIN);
        }
        if (errorData?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
          const message = errorData.message;
          const errorKey = getErrorsKey<KeyofCreatePatientSchema>(
            message,
            "email",
            "ci"
          );
          if (errorKey) setError(errorKey, { type: "validate" });
        }
      }
    },
    [createPatient, reset, router, setError]
  );

  return useMemo(
    () => ({
      values: { errors, openModal, isError, isLoading, errorResponse },
      actions: {
        register,
        handleSubmit,
        handleCreatePatient,
        handleCloseModal,
        handleOpenModal,
      },
    }),
    [
      errorResponse,
      errors,
      handleCreatePatient,
      handleSubmit,
      isError,
      isLoading,
      openModal,
      register,
    ]
  );
};
