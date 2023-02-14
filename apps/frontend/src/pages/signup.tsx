import { AuthLayout } from "../features/auth";
import { SignupContainer } from "../features/auth";

const Signup = () => {
  return (
    <AuthLayout authPage="signup">
      <SignupContainer />
    </AuthLayout>
  );
};

export default Signup;
