import { useLogin } from "../../hooks";
import SigninPresenter from "./SigninPresenter";

const SigninContainer = () => {
  const loginModel = useLogin();

  return <SigninPresenter {...loginModel} />;
};

export default SigninContainer;
