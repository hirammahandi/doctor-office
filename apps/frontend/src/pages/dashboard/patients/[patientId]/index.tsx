import { withRedirect } from "../../../../components/layouts/RedirectToProfile";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import { GetPatientContainer } from "../../../../features/patients";

const PatientIdPage = () => {
  return (
    <DashboardLayout>
      <GetPatientContainer />
    </DashboardLayout>
  );
};

export default withRedirect(PatientIdPage);
