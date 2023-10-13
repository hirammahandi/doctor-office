import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { withRedirect } from "../../../components/layouts/RedirectToProfile";

const MedicalRecordsPage = () => {
  return <h1>Medical Records</h1>;
};

MedicalRecordsPage.getLayout = (page: any) => {
  return <DashboardLayout>{withRedirect(page).caller()}</DashboardLayout>;
};

export default MedicalRecordsPage;
