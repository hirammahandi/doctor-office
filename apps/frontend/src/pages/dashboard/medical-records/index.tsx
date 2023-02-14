import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { withRedirect } from "../../../components/layouts/RedirectToProfile";

const MedicalRecordsPage = () => {
  return <DashboardLayout>ClinicHistoriesPage</DashboardLayout>;
};

export default withRedirect(MedicalRecordsPage);
