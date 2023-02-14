import { PickType } from "@nestjs/swagger";
import { SignupAuthenticationDto } from "./create-authentication.dto";

export class SigninAuthenticationDto extends PickType(SignupAuthenticationDto, [
  "email",
  "password",
]) {}
