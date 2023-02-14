import { withRedirect } from "../../../../components/layouts/RedirectToProfile";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import { GetMedicalRecordsByPatientContainer } from "../../../../features/patients";

const GetMedicalRecordByPatientPage = () => {
  return (
    <DashboardLayout>
      <GetMedicalRecordsByPatientContainer />
    </DashboardLayout>
  );
};

export default withRedirect(GetMedicalRecordByPatientPage);
