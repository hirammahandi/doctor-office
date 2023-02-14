import CustomDataGrid from "../../../../components/DataGrid/CustomDataGrid";
import ErrorAlert from "../../../../components/ErrorAlert";
import Header from "../../../../components/Header";
import { columnsPatient } from "../../constants";
import { usePatient } from "../../hooks/usePatient";
import CustomNoRowsOverlayContainer from "../create-patient/CustomNoRowsOverlayContainer";
import CustomToolbar from "../customs-ui/CustomToolbar";

type Props = ReturnType<typeof usePatient>;

const GetAllPatientsPresenter = ({ values, actions }: Props) => {
  const { patients, isLoading, isError, error } = values;
  const { handlePatientsIds, navigateTo } = actions;

  return (
    <>
      <Header title="PATIENTS" subtitle="List of patients" />
      {isError && <ErrorAlert error={error} />}
      <CustomDataGrid
        rows={patients}
        columns={columnsPatient}
        checkboxSelection
        disableSelectionOnClick
        loading={isLoading}
        onSelectionModelChange={handlePatientsIds}
        onRowClick={({ id: patientId }) => navigateTo(patientId)}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlayContainer,
          ErrorOverlay: (props) => {
            /* 
              TODO: Check this feature from data grid (error.message)
            */
            console.log("Check Props", props);
            return <ErrorAlert error={props.error} />;
          },
        }}
      />
    </>
  );
};

export default GetAllPatientsPresenter;
