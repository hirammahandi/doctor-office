import { Skeleton } from "@mui/material";

export const TextFieldWithLoading = ({
  isLoading,
  input,
}: {
  isLoading: boolean;
  input: JSX.Element;
}) => {
  return isLoading ? <Skeleton variant="rounded" height={"56px"} /> : input;
};
