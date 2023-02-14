import { IDoctor } from "@common/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { removeToken } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { updateProfileSchema } from "../schema";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "../slices/profileApiSlices";
import { KeyofUpdateProfileSchema, UpdateProfileSchema } from "../types";

const defaultValues: UpdateProfileSchema = {
  name: "",
  lastName: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
};

export const useProfile = () => {
  const [isUpdate, setIsUpdate] = useState(true);
  const router = useRouter();
  const { data: doctor, isLoading, isError, isSuccess, error: errorResponse } = useGetDoctorQuery();

  const [
    updateDoctor,
    { isLoading: isUpdateDoctorLoading, isError: isUpdateDoctorError, error: updateDoctorError },
  ] = useUpdateDoctorMutation();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    defaultValues,
    values: {
      name: doctor?.data.name as string,
      lastName: doctor?.data.lastName as string,
      email: doctor?.data.email as string,
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updateProfileSchema),
  });

  const handleIsUpdate: MouseEventHandler = useCallback(() => {
    setIsUpdate(false);
  }, []);

  const handleUpdateProfile = useCallback(
    async (data: UpdateProfileSchema) => {
      try {
        const { confirmPassword, newPassword, ...rest } = data;

        const payload: Partial<Omit<IDoctor, "patients">> = {
          ...rest,
        };

        if (confirmPassword && newPassword) payload.password = confirmPassword;

        const response = await updateDoctor(payload).unwrap();

        if (response.success) {
          setIsUpdate(true);
          resetField("newPassword");
          resetField("confirmPassword");
        }
      } catch (error) {
        const errorData = isInstanceOfFetchBaseQueryError(error) ? getErrorData(error) : null;

        if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) {
          removeToken();
          router.push(CLIENT_ROUTES.SIGNIN);
        }

        if (errorData?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
          const message = errorData?.message;
          const errorKey = getErrorsKey<KeyofUpdateProfileSchema>(message, "email");

          if (errorKey) setError(errorKey, { type: "validate" });
        }
      }
    },
    [resetField, router, setError, updateDoctor]
  );

  return useMemo(
    () => ({
      values: {
        doctor,
        isLoading,
        isError,
        isSuccess,
        errorResponse,
        errors,
        isUpdate,
        isUpdateDoctorLoading,
        isUpdateDoctorError,
        updateDoctorError,
      },
      action: { register, handleSubmit, handleIsUpdate, handleUpdateProfile },
    }),
    [
      doctor,
      errorResponse,
      errors,
      handleIsUpdate,
      handleSubmit,
      handleUpdateProfile,
      isError,
      isLoading,
      isSuccess,
      isUpdate,
      isUpdateDoctorError,
      isUpdateDoctorLoading,
      register,
      updateDoctorError,
    ]
  );
};
