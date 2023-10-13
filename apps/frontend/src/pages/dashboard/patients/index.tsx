import { withLayout } from "../../../components/layouts/DashboardLayout";
import { withRedirect } from "../../../components/layouts/RedirectToProfile";
import { GetAllPatientsContainer } from "../../../features/patients";

const PatientsPage = () => {
  return <GetAllPatientsContainer />;
};

export default withLayout(withRedirect(PatientsPage));

// TODO: * getServerSideProps with redux
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getPatients.initiate());

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
