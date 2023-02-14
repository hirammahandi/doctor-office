import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Doctor } from "../entities/doctor.entity";

@Injectable()
export class DoctorRepository extends Repository<Doctor> {
  constructor(
    @InjectRepository(Doctor)
    repository: Repository<Doctor>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findByEmail(email: string) {
    return this.findOneBy({ email });
  }

  findDoctorByPatientEmail(patientEmail: string) {
    return this.findOneBy({ email: patientEmail });
  }
}
