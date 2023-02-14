import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import {
  CreateAuthenticationDto,
  SigninAuthenticationDto,
  UpdateAuthenticationDto,
} from "./dto";
@ApiTags("authorization")
@Controller("auth")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() body: SigninAuthenticationDto) {
    return this.authenticationService.signin(body);
  }

  @Post("signup")
  signup(@Body() body: CreateAuthenticationDto) {
    return this.authenticationService.signup(body);
  }

  @Patch("reset-password")
  resetPassword(@Body() body: UpdateAuthenticationDto) {
    return this.authenticationService.resetPassword(body);
  }
}
