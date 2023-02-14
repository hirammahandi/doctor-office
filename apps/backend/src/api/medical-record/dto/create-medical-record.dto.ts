import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
