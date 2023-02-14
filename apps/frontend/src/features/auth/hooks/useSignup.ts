import { zodResolver } from "@hookform/resolvers/zod";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  CLIENT_ROUTES,
  getErrorData,
  getErrorsKey,
  isInstanceOfFetchBaseQueryError,
} from "../../../shared";
import { signupSchema } from "../schemas";
import { useSignupMutation } from "../slices/authApiSlice";
import { KeyofSignupSchema, SignupSchema } from "../types";

const defaultValues: SignupSchema = {
  email: "",
  password: "",
  name: "",
  lastName: "",
};

export const useSignup = () => {
  const router = useRouter();
  const [signup, { isError, isLoading, error: errorResponse }] =
    useSignupMutation();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<SignupSchema>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (data: SignupSchema) => {
    try {
      const response = await signup(data).unwrap();
      if (response.success) router.push(CLIENT_ROUTES.SIGNIN);
    } catch (error) {
      const errorData = isInstanceOfFetchBaseQueryError(error)
        ? getErrorData(error)
        : null;

      if (
        errorData &&
        errorData.statusCode === StatusCodes.UNPROCESSABLE_ENTITY
      ) {
        const message = errorData.message;
        const errorKey = getErrorsKey<KeyofSignupSchema>(message, "email");
        if (errorKey) setError(errorKey, { type: "validate" });
      }
    }
  };

  return {
    values: { errors, isError, isLoading, errorResponse },
    actions: { handleSubmit, handleSignup, register },
  };
};
