import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import ErrorAlert from "../../../../components/ErrorAlert";
import GoBackButton from "../../../../components/GoBackButton";
import Header from "../../../../components/Header";
import { CLIENT_ROUTES } from "../../../../shared";
import { useEditPatient } from "../../hooks";

type Props = ReturnType<typeof useEditPatient>;

const EditPatientPresenter = ({ value, actions }: Props) => {
  const { patientToEdit, errors, isError, errorResponse, isLoading, isDisabledToEdit } = value;
  const { handleEditPatient, handleSubmit, register } = actions;

  return (
    <>
      <Header title="EDIT PATIENT" subtitle="Can edit patient information" />
      {patientToEdit && <GoBackButton />}
      {!patientToEdit ? (
        <Stack>
          <Typography variant="h4" color="initial" textAlign="center">
            There is not patient to edit
          </Typography>
          <Button
            LinkComponent={Link}
            variant="outlined"
            color="primary"
            href={CLIENT_ROUTES.PATIENTS}
            startIcon={<ArrowBackIcon />}
          >
            Back to patients
          </Button>
        </Stack>
      ) : (
        <Paper sx={{ padding: 2 }}>
          {isError && <ErrorAlert error={errorResponse} />}
          <Grid
            component="form"
            onSubmit={handleSubmit(handleEditPatient)}
            container
            spacing={2}
            padding={2}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                id="patient-to-edit-name"
                label="Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName")}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                id="patient-to-edit-lastName"
                label="Last Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                id="patient-to-edit-email"
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("ci")}
                error={Boolean(errors.ci)}
                helperText={errors.ci?.message}
                id="patient-to-edit-ci"
                label="CI"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("address")}
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                id="patient-to-edit-address"
                label="Address"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} display="flex">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                loading={isLoading}
                disabled={isDisabledToEdit}
                sx={{ ml: "auto" }}
              >
                Edit
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default EditPatientPresenter;
