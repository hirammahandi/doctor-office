import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { defaultHtmlValue } from "../../../components/RichTextEditor";
import { removeToken } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { apiSlice } from "../../../store/api/apiSlice";
import { createMedicalRecordSchema } from "../schema";
import { useCreateMedicalRecordsMutation } from "../slices/medicalRecordApiSlice";
import { CreateMedicalRecordSchema, KeyofCreateMedicalRecordSchema } from "../types";

export const useCreateMedicalRecord = () => {
  const [createMedicalRecords, { isError, isLoading, isSuccess, error: errorResponse }] =
    useCreateMedicalRecordsMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateMedicalRecordSchema>({
    mode: "onSubmit",
    defaultValues: {
      description: defaultHtmlValue,
    },
    resolver: zodResolver(createMedicalRecordSchema),
  });

  const handleCreateMedicalRecord = async (body: CreateMedicalRecordSchema) => {
    try {
      const patientId = router.query.patientId as string | undefined;
      if (patientId) {
        const response = await createMedicalRecords({ patientId, body }).unwrap();
        if (response.success) {
          toast.success("Medical Record has been created successfully", {
            hideProgressBar: true,
            position: "top-right",
          });
          reset(
            { description: defaultHtmlValue },
            { keepErrors: false, keepDirty: false, keepDirtyValues: false }
          );
          dispatch(apiSlice.util.invalidateTags([{ type: "Patient", id: patientId }]));
        }
      }
    } catch (error) {
      const errorData = isInstanceOfFetchBaseQueryError(error) ? getErrorData(error) : null;

      if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) {
        removeToken();
        router.push(CLIENT_ROUTES.SIGNIN);
      }

      if (errorData?.statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
        const message = errorData.message;
        const errorKey = getErrorsKey<KeyofCreateMedicalRecordSchema>(message, "description");

        if (errorKey) setError(errorKey, { type: "validate" });
      }
    }
  };

  return {
    values: { control, errors, isError, errorResponse, isSuccess, isLoading },
    actions: { handleSubmit, handleCreateMedicalRecord },
  };
};
