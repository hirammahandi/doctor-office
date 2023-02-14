import { IsDateString } from "class-validator";

export class SearchMedicalRecordByDateDto {
  @IsDateString()
  dateToSearch: Date;
}
