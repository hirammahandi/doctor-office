import { PickType } from "@nestjs/swagger";
import { CreateDoctorDto } from "../../doctor/dto";

export class ResetPasswordDto extends PickType(CreateDoctorDto, ["password"]) {}
