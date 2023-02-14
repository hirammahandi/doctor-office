import { IMedicalRecord, IDoctor, IPatient } from "@common/lib";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../shared/base-entity/base.entity";
import { MedicalRecord } from "../../medical-record/entities/medical-record.entity";
import { Doctor } from "../../doctor/entities/doctor.entity";

@Entity({ name: "patients" })
export class Patient extends BaseModel implements IPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  @Column({ type: "varchar", length: 120 })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", unique: true, length: 11 })
  ci: string;

  @Column({ type: "varchar" })
  address: string;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords: IMedicalRecord[];

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, { onDelete: "CASCADE" })
  doctor: IDoctor;
}
