import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ErrorAlert from "../../../../components/ErrorAlert";
import SlideTransition from "../../../../components/SlideTransition";
import { CreatePatientSchema } from "../../types";

type Props = {
  openModal: boolean;
  isError: boolean;
  errorResponse: unknown;
  isLoading: boolean;
  errors: Partial<
    FieldErrorsImpl<{
      ci: string;
      name: string;
      lastName: string;
      email: string;
      address: string;
    }>
  >;
  register: UseFormRegister<CreatePatientSchema>;
  handleCloseModal(): void;
  handleSubmit: UseFormHandleSubmit<CreatePatientSchema>;
  handleCreatePatient(data: CreatePatientSchema): void;
};

const CreatePatientModalPresenter = ({
  openModal,
  isError,
  errorResponse,
  isLoading,
  errors,
  register,
  handleSubmit,
  handleCloseModal,
  handleCreatePatient,
}: Props) => (
  <Dialog
    open={openModal}
    onClose={handleCloseModal}
    TransitionComponent={SlideTransition}
    maxWidth="md"
  >
    <DialogTitle>Create New Patient</DialogTitle>
    <form onSubmit={handleSubmit(handleCreatePatient)}>
      <DialogContent>
        <DialogContentText marginBottom={2}>
          To create a new patient, please fill in the form.
        </DialogContentText>
        {isError && <ErrorAlert error={errorResponse} />}
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
          wrap="wrap"
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="ci"
              label="CI"
              {...register("ci")}
              error={Boolean(errors.ci)}
              helperText={errors.ci?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name")}
              fullWidth
              id="name"
              label="Name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastName")}
              fullWidth
              id="lastName"
              label="Last Name"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("email")}
              fullWidth
              type="email"
              id="email"
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("address")}
              fullWidth
              id="address"
              label="Address"
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="warning">
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          disableElevation
        >
          Create
        </LoadingButton>
      </DialogActions>
    </form>
  </Dialog>
);

export default CreatePatientModalPresenter;
