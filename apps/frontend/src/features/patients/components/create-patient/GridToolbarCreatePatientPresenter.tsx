import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { useCreatePatient } from "../../hooks";
import CreatePatientModalPresenter from "./CreatePatientModalPresenter";

type Props = ReturnType<typeof useCreatePatient>;

const GridToolbarCreatePatientPresenter = ({ values, actions }: Props) => {
  const { handleOpenModal, ...restOfActions } = actions;

  return (
    <>
      <Button
        variant="text"
        color="primary"
        size="small"
        startIcon={<AddCircleOutlinedIcon />}
        onClick={handleOpenModal}
      >
        Create
      </Button>
      <CreatePatientModalPresenter {...values} {...restOfActions} />
    </>
  );
};

export default GridToolbarCreatePatientPresenter;
