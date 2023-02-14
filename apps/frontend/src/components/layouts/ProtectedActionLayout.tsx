import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getErrorData, isInstanceOfFetchBaseQueryError } from "../../shared";

type Props = {
  children: ReactNode;
  error: unknown;
};

// TODO: Check this feature
const ProtectedActionLayout = ({ children, error }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const errorData = isInstanceOfFetchBaseQueryError(error)
    ? getErrorData(error)
    : null;

  const isUnauthorized = errorData?.statusCode === StatusCodes.UNAUTHORIZED;

  useEffect(() => {
    if (isUnauthorized) {
      console.log({ isUnauthorized });
      // router.push(CLIENT_ROUTES.SIGNIN).then(() => {
      //   removeToken();
      // });
    }
  }, [dispatch, isUnauthorized, router]);

  if (isUnauthorized) return null;

  return <>{children}</>;
};

export default ProtectedActionLayout;
