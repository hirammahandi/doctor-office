import { Alert, AlertTitle } from "@mui/material";
import { StatusCodes } from "http-status-codes";
import { memo } from "react";
import { getErrorData, isInstanceOfFetchBaseQueryError } from "../shared";

type Props = {
  error: unknown;
};

const ErrorAlert = ({ error }: Props) => {
  const errorData = isInstanceOfFetchBaseQueryError(error) ? getErrorData(error) : null;

  if (errorData?.statusCode === StatusCodes.UNAUTHORIZED) return null;

  const content =
    errorData?.statusCode !== StatusCodes.INTERNAL_SERVER_ERROR
      ? { error: errorData?.error, message: errorData?.message }
      : { error: "Error", message: "An error has occurred. Try again" };

  return (
    <Alert severity="error" sx={{ mb: "20px" }}>
      <AlertTitle>{content.error}</AlertTitle>
      {content.message}
    </Alert>
  );
};

export default memo(ErrorAlert);
