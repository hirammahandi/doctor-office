import { Box, Typography, Button } from "@mui/material";
import { useCreatePatient } from "../../hooks";
import CreatePatientModalPresenter from "./CreatePatientModalPresenter";

type Props = ReturnType<typeof useCreatePatient>;

const CustomNoRowsOverlayPresenter = ({ values, actions }: Props) => {
  const { handleOpenModal, ...restOfActions } = actions;
  return (
    <>
      <Box
        id="no-rows"
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          component="div"
          variant="h3"
          color="GrayText"
          align="center"
        >
          There are no patients to display
          <Typography variant="subtitle1" color="GrayText">
            If you want to create a patient click here
          </Typography>
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ textTransform: "capitalize" }}
          onClick={handleOpenModal}
        >
          Create Patient
        </Button>
      </Box>
      <CreatePatientModalPresenter {...values} {...restOfActions} />
    </>
  );
};

export default CustomNoRowsOverlayPresenter;
