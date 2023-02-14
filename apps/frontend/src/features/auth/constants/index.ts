import { CLIENT_ROUTES } from "../../../shared";
import { AuthFooterMessage } from "../types";

export const footerSigninMessage: AuthFooterMessage = {
  paraph: "New to Doctor`s office?",
  buttonText: "Sign Up!",
  href: CLIENT_ROUTES.SIGNUP,
};

export const footerSignupMessage: AuthFooterMessage = {
  paraph: "Do you have an account?",
  buttonText: "Sign In!",
  href: CLIENT_ROUTES.SIGNIN,
};
