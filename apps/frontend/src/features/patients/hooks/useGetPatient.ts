import { useRouter } from "next/router";
import { useState } from "react";
import { CLIENT_ROUTES } from "../../../shared";
import { useGetPatientByIdQuery } from "../slices/patientsApiSlices";

export const useGetPatient = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const patientId = router.query.patientId as string;

  const {
    data: patient,
    isLoading,
    isError,
    isSuccess,
    error: errorResponse,
  } = useGetPatientByIdQuery(+patientId);

  const openMenu = Boolean(anchorEl);

  const createMedicalRecordByPatientHref = CLIENT_ROUTES.CREATE_MEDICAL_RECORD_BY_PATIENT.replace(
    "{patientId}",
    `${patient?.id}`
  );
  const getMedicalRecordByPatientHref = CLIENT_ROUTES.GET_MEDICAL_RECORD_BY_PATIENT.replace(
    "{patientId}",
    `${patient?.id}`
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigateToEditPatientPage = () => {
    const editPatientHref = CLIENT_ROUTES.EDIT_PATIENT.replace("{patientId}", `${patient?.id}`);

    handleCloseMenu();
    router.push(editPatientHref);
  };

  return {
    values: {
      patient,
      isLoading,
      isError,
      isSuccess,
      errorResponse,
      openMenu,
      anchorEl,
      links: { createMedicalRecordByPatientHref, getMedicalRecordByPatientHref },
    },
    actions: { handleCloseMenu, handleOpenMenu, navigateToEditPatientPage },
  };
};
