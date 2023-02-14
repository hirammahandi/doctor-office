import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorModule } from "../doctor/doctor.module";
import { Patient } from "./entities";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { PatientRepository } from "./repositories";
import { PatientSubscriber } from "./subscribers";

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), DoctorModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository, PatientSubscriber],
  exports: [PatientService],
})
export class PatientModule {}
