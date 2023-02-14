import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { useLogin } from "../../hooks";
import ErrorAlert from "../../../../components/ErrorAlert";

type Props = ReturnType<typeof useLogin>;

const SigninPresenter = ({ values, actions }: Props) => {
  const { errors, isLoading, isError, errorResponse } = values;
  const { register, handleLogin, handleSubmit } = actions;

  return (
    <>
      {isError && <ErrorAlert error={errorResponse} />}
      <Stack component="form" onSubmit={handleSubmit(handleLogin)} spacing={3}>
        <TextField
          {...register("email")}
          id="email"
          label="Email"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          id="password"
          label="Password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          sx={{ textTransform: "capitalize" }}
        >
          Signin
        </LoadingButton>
      </Stack>
    </>
  );
};

export default SigninPresenter;
