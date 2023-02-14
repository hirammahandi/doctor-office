import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalRecord } from "../entities";

@Injectable()
export class MedicalRecordRepository extends Repository<MedicalRecord> {
  constructor(
    @InjectRepository(MedicalRecord) repository: Repository<MedicalRecord>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
