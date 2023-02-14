import { Alert, AlertTitle, Chip, Divider, Paper, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GoBackButton from "../../../../components/GoBackButton";
import Header from "../../../../components/Header";
import MedicalRecordCard from "../../../../components/MedicalRecordCard";
import { useGetMedicalRecordsByPatient } from "../../hooks/useGetMedicalRecordsByPatient";

type Props = ReturnType<typeof useGetMedicalRecordsByPatient>;

// TODO: Invalidate tags for returned patient
const GetMedicalRecordsByPatientPresenter = ({ values, actions }: Props) => {
  const { medicalRecords, patientFullName } = values;
  const { handleChangeSearchDate } = actions;

  return (
    <>
      <Header
        title="Medical Records"
        subtitle={
          <>
            All the medical records of the patient:{" "}
            <Chip
              label={patientFullName}
              variant="outlined"
              color="primary"
              sx={{ fontSize: "1rem" }}
            />
          </>
        }
      />
      <GoBackButton />
      <Paper sx={{ padding: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={2}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <TextField
            id="search-medical-record"
            label="Search Medical Record"
            InputLabelProps={{
              shrink: true,
            }}
            type="date"
            sx={{ width: { xs: "100%", md: 200 } }}
            onChange={handleChangeSearchDate}
          />
          <Alert severity="info" sx={{ width: { xs: "100%", md: "65%" } }}>
            <AlertTitle>Info</AlertTitle>
            The search will return all medical records with a creation date greater than the one
            entered in the search field
          </Alert>
        </Stack>
        <Divider flexItem variant="middle" />
        <Box sx={{ mt: 2 }}>
          {medicalRecords.map((medicalRecord) => (
            <MedicalRecordCard key={medicalRecord.id} medicalRecord={medicalRecord} />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default GetMedicalRecordsByPatientPresenter;
