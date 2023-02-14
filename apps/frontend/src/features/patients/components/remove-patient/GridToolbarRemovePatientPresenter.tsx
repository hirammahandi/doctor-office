import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import SlideTransition from "../../../../components/SlideTransition";
import { useRemovePatient } from "../../hooks/useRemovePatient";

type Props = ReturnType<typeof useRemovePatient>;

const GridToolbarRemovePatientPresenter = ({ actions, values }: Props) => {
  const { openDialog, patientsIds, isLoading } = values;
  const {
    handleRemovePatient: removePatient,
    handleOpenDialog,
    handleCloseDialog,
  } = actions;

  const isDisabled = patientsIds.length === 0;

  return (
    <>
      <Tooltip
        title={
          isDisabled
            ? "Select a patient to remove"
            : `${patientsIds.length} patient(s) selected`
        }
        arrow
        placement="top-start"
      >
        <div>
          <Button
            variant="text"
            size="small"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleOpenDialog}
            disabled={isDisabled}
          >
            Remove
          </Button>
        </div>
      </Tooltip>
      <Dialog
        TransitionComponent={SlideTransition}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove Patient(s)</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete these patients?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="warning">
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={removePatient}
            variant="contained"
            autoFocus
            disableElevation
          >
            Accept
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GridToolbarRemovePatientPresenter;
