import { Module } from "@nestjs/common";
import { MedicalRecordModule } from "./medical-record/medical-record.module";
import { DoctorModule } from "./doctor/doctor.module";
import { PatientModule } from "./patient/patient.module";
import { AuthenticationModule } from "./authentication/authentication.module";

@Module({
  imports: [
    PatientModule,
    MedicalRecordModule,
    DoctorModule,
    AuthenticationModule,
  ],
})
export class ApiModule {}
