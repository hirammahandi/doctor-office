import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { memo } from "react";
import ErrorAlert from "../../../../components/ErrorAlert";
import Header from "../../../../components/Header";
import { useProfile } from "../../hooks";
import { TextFieldWithLoading } from "../ui";

type Props = ReturnType<typeof useProfile>;

const ProfilePresenter = ({ values, action }: Props) => {
  const {
    isLoading,
    errors,
    isUpdate,
    isError,
    isSuccess,
    errorResponse,
    isUpdateDoctorError,
    updateDoctorError,
    isUpdateDoctorLoading,
  } = values;

  const { handleIsUpdate, handleSubmit, register, handleUpdateProfile } =
    action;

  return (
    <>
      <Header
        title="DOCTOR PROFILE"
        subtitle="Review and update your profile"
      />
      {isError && <ErrorAlert error={errorResponse} />}
      {isSuccess && (
        <Stack component={Paper} spacing={3} sx={{ padding: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: "auto" }}
            onClick={handleIsUpdate}
            startIcon={<EditOutlinedIcon />}
          >
            Edit
          </Button>
          {isUpdateDoctorError && (
            <Box sx={{ width: { xs: "100%", sm: 400 } }}>
              <ErrorAlert error={updateDoctorError} />
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit(handleUpdateProfile)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="initial" gutterBottom>
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithLoading
                  isLoading={isLoading}
                  input={
                    <TextField
                      {...register("name")}
                      fullWidth
                      id="name"
                      label="Name"
                      disabled={isUpdate}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithLoading
                  isLoading={isLoading}
                  input={
                    <TextField
                      {...register("lastName")}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      disabled={isUpdate}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithLoading
                  isLoading={isLoading}
                  input={
                    <TextField
                      {...register("email")}
                      fullWidth
                      id="email"
                      label="Email"
                      disabled={isUpdate}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" color="initial" gutterBottom>
                  Change Password
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithLoading
                  isLoading={isLoading}
                  input={
                    <TextField
                      {...register("newPassword")}
                      disabled={isUpdate}
                      fullWidth
                      id="newPassword"
                      label="New Password"
                      error={Boolean(errors.newPassword)}
                      helperText={errors.newPassword?.message}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextFieldWithLoading
                  isLoading={isLoading}
                  input={
                    <TextField
                      {...register("confirmPassword")}
                      disabled={isUpdate}
                      fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword?.message}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} display="flex">
                <LoadingButton
                  variant="contained"
                  type={"submit"}
                  color="primary"
                  disableElevation
                  loading={isUpdateDoctorLoading}
                  disabled={isUpdate}
                  sx={{ marginLeft: "auto" }}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default memo(ProfilePresenter);
