import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DoctorRepository } from "../../doctor/repositories";
import { JwtPayload } from "../types";

// * The name of the strategy that we going to be used in the authGuard can be any, Ex: "jwt"
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private readonly doctorRepository: DoctorRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("JWT_SECRET"),
    });
  }

  async validate({ sub }: JwtPayload) {
    const doctor = await this.doctorRepository.findOne({
      where: { id: sub },
      select: [
        "id",
        "email",
        "name",
        "patients",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    });
    return doctor;
  }
}
