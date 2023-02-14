import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientModule } from "../patient/patient.module";
import { MedicalRecordController } from "./medical-record.controller";
import { MedicalRecordService } from "./medical-record.service";
import { MedicalRecord } from "./entities/medical-record.entity";
import { MedicalRecordRepository } from "./repositories";

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord]), PatientModule],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService, MedicalRecordRepository],
})
export class MedicalRecordModule {}
