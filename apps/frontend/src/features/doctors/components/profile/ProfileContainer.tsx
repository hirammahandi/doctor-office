import { useProfile } from "../../hooks";
import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const profileModel = useProfile();
  return <ProfilePresenter {...profileModel} />;
};

export default ProfileContainer;
