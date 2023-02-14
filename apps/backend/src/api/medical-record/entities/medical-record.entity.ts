import { IMedicalRecord, IPatient } from "@common/lib";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../shared/base-entity/base.entity";
import { Patient } from "../../patient/entities/patient.entity";

@Entity({ name: "medical-records" })
export class MedicalRecord extends BaseModel implements IMedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  description: string;

  @ManyToOne(() => Patient, (patient) => patient.medicalRecords, {
    onDelete: "CASCADE",
  })
  patient: IPatient;
}
