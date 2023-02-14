import dynamic from "next/dynamic";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import { withRedirect } from "../../../../components/layouts/RedirectToProfile";

const DynamicCreateMedicalRecordContainer = dynamic(
  () =>
    import("../../../../features/medical-records").then(
      (components) => components.CreateMedicalRecordContainer
    ),
  { loading: () => <p>Loading...</p>, ssr: false }
);

const CreateMedicalRecordByPatient = () => {
  return (
    <DashboardLayout>
      <DynamicCreateMedicalRecordContainer />
    </DashboardLayout>
  );
};

export default withRedirect(CreateMedicalRecordByPatient);
