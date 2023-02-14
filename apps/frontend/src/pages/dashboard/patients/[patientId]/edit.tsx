import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import { withRedirect } from "../../../../components/layouts/RedirectToProfile";
import { EditPatientContainer } from "../../../../features/patients";

const EditPatientPage = () => {
  return (
    <DashboardLayout>
      <EditPatientContainer />
    </DashboardLayout>
  );
};

export default withRedirect(EditPatientPage);
