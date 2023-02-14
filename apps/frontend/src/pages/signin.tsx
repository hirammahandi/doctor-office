import { AuthLayout } from "../features/auth";
import { SigninContainer } from "../features/auth";

const SigninPage = () => {
  return (
    <AuthLayout authPage="signin">
      <SigninContainer />
    </AuthLayout>
  );
};

export default SigninPage;
