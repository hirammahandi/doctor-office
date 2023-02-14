import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(
    @InjectRepository(Patient)
    repository: Repository<Patient>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findByEmail(email: string) {
    return this.findOneBy({ email });
  }

  findByCI(ci: string) {
    return this.findOneBy({ ci });
  }
}
