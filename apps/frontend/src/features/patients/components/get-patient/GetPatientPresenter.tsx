import ContactEmergencyIcon from "@mui/icons-material/ContactEmergencyOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ErrorAlert from "../../../../components/ErrorAlert";
import Header from "../../../../components/Header";
import LinkButton from "../../../../components/LinkButton";
import MedicalRecordCard from "../../../../components/MedicalRecordCard";
import SkeletonLoader from "../../../../components/SkeletonLoader";
import { linkTextContent, typographyStyles } from "../../constants";
import { useGetPatient } from "../../hooks";

type Props = ReturnType<typeof useGetPatient>;

const GetPatientPresenter = ({ values, actions }: Props) => {
  const { patient, isLoading, isSuccess, isError, errorResponse, openMenu, anchorEl, links } =
    values;
  const { createMedicalRecordByPatientHref, getMedicalRecordByPatientHref } = links;
  const { handleCloseMenu, handleOpenMenu, navigateToEditPatientPage } = actions;

  return (
    <>
      <Header title="PATIENTS" subtitle="Patient Details" />
      {isError && <ErrorAlert error={errorResponse} />}
      {isSuccess && patient && (
        <Paper sx={{ minHeight: "50vh", padding: 4 }}>
          <Grid container spacing={2} minHeight="50vh">
            <Grid item xs={12} lg={4}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between">
                <Box>
                  <Typography {...typographyStyles}>
                    <SkeletonLoader
                      isLoading={isLoading}
                      component={
                        <>
                          <PersonOutlineIcon fontSize="large" />
                          {patient.name} {patient.lastName}
                        </>
                      }
                    />
                  </Typography>
                  <Typography {...typographyStyles}>
                    <SkeletonLoader
                      isLoading={isLoading}
                      component={
                        <>
                          <ContactEmergencyIcon fontSize="large" />
                          {patient.ci}
                        </>
                      }
                    />
                  </Typography>

                  <Typography {...typographyStyles} component="a" href={`mailto:${patient.email}`}>
                    <SkeletonLoader
                      isLoading={isLoading}
                      component={
                        <>
                          <EmailOutlinedIcon fontSize="large" />
                          {patient.email}
                        </>
                      }
                    />
                  </Typography>
                  <Typography {...typographyStyles}>
                    <SkeletonLoader
                      isLoading={isLoading}
                      component={
                        <>
                          <PlaceOutlinedIcon fontSize="large" />
                          {patient.address}
                        </>
                      }
                    />
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Options" placement="top">
                    <IconButton
                      id="patient-details-action"
                      aria-label="patient-details-menu-action"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      sx={{ display: { xs: "none", sm: "inline-flex" } }}
                      onClick={handleOpenMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Options" placement="top">
                    <IconButton
                      aria-label="patient-details-menu-action"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      sx={{ display: { xs: "inline-flex", sm: "none" } }}
                      onClick={handleOpenMenu}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="patient-details-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={navigateToEditPatientPage}>
                      <EditOutlined />
                      Edit Information
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
            </Grid>
            <Divider
              variant="middle"
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", xl: "block" } }}
            />

            <Grid item xs={12} lg={7}>
              {patient.medicalRecords.length ? (
                <>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    mb="10px"
                  >
                    <Typography variant="h4" color="initial" gutterBottom>
                      Medical Records
                    </Typography>
                    <LinkButton
                      href={createMedicalRecordByPatientHref}
                      textContent={linkTextContent}
                    />
                  </Stack>
                  {patient.medicalRecords.slice(0, 3).map((medicalRecord) => (
                    <MedicalRecordCard key={medicalRecord.id} medicalRecord={medicalRecord} />
                  ))}
                  <Box mt="10px">
                    <LinkButton href={getMedicalRecordByPatientHref} textContent="View More..." />
                  </Box>
                </>
              ) : (
                <Box sx={{ display: "grid", placeItems: "center" }}>
                  <LinkButton
                    href={createMedicalRecordByPatientHref}
                    textContent={linkTextContent}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default GetPatientPresenter;
