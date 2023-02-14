import { IAuthentication, IDoctor, ISuccessResponse } from "@common/lib";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { InvalidCredentials } from "../../shared/exceptions";
import { throwErrorIsInstanceOf } from "../../shared/utils";
import { DoctorService } from "../doctor/doctor.service";
import { Doctor } from "../doctor/entities";
import { DoctorRepository } from "../doctor/repositories";
import {
  CreateAuthenticationDto,
  SigninAuthenticationDto,
  UpdateAuthenticationDto,
} from "./dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly doctorService: DoctorService,
    private readonly doctorRepository: DoctorRepository
  ) {}

  async signin(
    signinAuthenticationDto: SigninAuthenticationDto
  ): Promise<ISuccessResponse<IAuthentication>> {
    try {
      const { email: emailFromBody, password: passwordFromBody } =
        signinAuthenticationDto;

      const doctor = await this.doctorRepository.findByEmail(emailFromBody);

      if (!doctor) throw new InvalidCredentials("Your email is wrong!");

      const isCorrectPassword = await argon.verify(
        doctor.password,
        passwordFromBody
      );

      if (!isCorrectPassword)
        throw new InvalidCredentials("Your password is wrong!");

      const accessToken = await this.signToken({
        id: doctor.id,
        email: doctor.email,
      });

      return { success: true, data: accessToken };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, InvalidCredentials);
      throw new InternalServerErrorException();
    }
  }

  async signup(
    createAuthenticationDto: CreateAuthenticationDto
  ): Promise<ISuccessResponse<Doctor>> {
    const createdDoctor = await this.doctorService.create(
      createAuthenticationDto
    );

    return createdDoctor;
  }

  // TODO: Implement resetPassword service
  resetPassword(updateAuthenticationDto: UpdateAuthenticationDto) {
    return "reset password";
  }

  async signToken({
    id,
    email,
  }: Pick<IDoctor, "id" | "email">): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      email,
    };

    const access_token = await this.jwt.signAsync(payload);
    return { access_token };
  }
}
