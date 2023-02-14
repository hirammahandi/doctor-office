import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { setCookie } from "../../../lib/cookies";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { loginSchema } from "../schemas";
import { useLoginMutation } from "../slices/authApiSlice";
import { KeyofLoginSchema, LoginSchema } from "../types";

const defaultValues: LoginSchema = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const [login, { isLoading, isSuccess, isError, error: errorResponse }] =
    useLoginMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        const { access_token } = res.data;
        setCookie(access_token);
        await router.push(CLIENT_ROUTES.PROFILE);
      }
    } catch (error) {
      const errorData = isInstanceOfFetchBaseQueryError(error)
        ? getErrorData(error)
        : null;

      if (errorData && errorData.statusCode === StatusCodes.FORBIDDEN) {
        const message = errorData.message;
        const errorKey = getErrorsKey<KeyofLoginSchema>(
          message,
          "email",
          "password"
        );
        if (errorKey) setError(errorKey, { type: "validate" });
      }
    }
  };

  return {
    values: {
      errors,
      isLoading,
      isSuccess,
      isError,
      errorResponse,
    },
    actions: { handleSubmit, handleLogin, register },
  };
};
