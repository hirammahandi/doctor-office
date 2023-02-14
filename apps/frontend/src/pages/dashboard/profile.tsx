import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ProfileContainer } from "../../features/doctors";

const Profile = () => {
  return (
    <DashboardLayout>
      <ProfileContainer />
    </DashboardLayout>
  );
};

export default Profile;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getDoctor.initiate());

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
