import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreatePatientDto } from "./create-patient.dto";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
