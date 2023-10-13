import { withLayout } from "../../components/layouts/DashboardLayout";
import { ProfileContainer } from "../../features/doctors";

const Profile = () => {
  return <ProfileContainer />;
};

export default withLayout(Profile);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getDoctor.initiate());

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
