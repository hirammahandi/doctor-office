import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { useSignup } from "../../hooks/useSignup";
import ErrorAlert from "../../../../components/ErrorAlert";

type Props = ReturnType<typeof useSignup>;

const SignupPresenter = ({ values, actions }: Props) => {
  const { errors, isError, isLoading, errorResponse } = values;
  const { register, handleSignup, handleSubmit } = actions;

  return (
    <>
      {isError && <ErrorAlert error={errorResponse} />}
      <Stack component="form" onSubmit={handleSubmit(handleSignup)} spacing={3}>
        <TextField
          {...register("name")}
          id="name"
          label="Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("lastName")}
          id="lastName"
          label="Last Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
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
          Signup
        </LoadingButton>
      </Stack>
    </>
  );
};

export default SignupPresenter;
