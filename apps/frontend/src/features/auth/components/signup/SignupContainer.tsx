import { useSignup } from "../../hooks/useSignup";
import SignupPresenter from "./SignupPresenter";

const SignupContainer = () => {
  const signupModel = useSignup();
  return <SignupPresenter {...signupModel} />;
};

export default SignupContainer;
