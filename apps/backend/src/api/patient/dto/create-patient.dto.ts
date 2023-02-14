import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
export class CreatePatientDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(11, 11, { message: "$property must have 11 characters" })
  @ApiProperty()
  ci: string;

  @IsString()
  @ApiProperty()
  address: string;
}
