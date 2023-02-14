import { GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import GridToolbarCreatePatientContainer from "../create-patient/GridToolbarCreatePatientContainer";
import GridToolbarRemovePatientContainer from "../remove-patient/GridToolbarRemovePatientContainer";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbar />
      <GridToolbarCreatePatientContainer />
      <GridToolbarRemovePatientContainer />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
