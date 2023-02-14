import { IDoctor } from "@common/lib";
import { z } from "zod";
import { CLIENT_ROUTES } from "../../../shared";
import {
  keysLoginSchema,
  keysSignupSchema,
  loginSchema,
  signupSchema,
} from "../schemas";

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;

export type KeyofLoginSchema = z.infer<typeof keysLoginSchema>;
export type KeyofSignupSchema = z.infer<typeof keysSignupSchema>;

export type AuthInitialState = {
  user: Pick<IDoctor, "id" | "email"> | null;
  token: string | null;
};

export type AuthFooterMessage = {
  paraph: string;
  buttonText: string;
  href: CLIENT_ROUTES;
};
