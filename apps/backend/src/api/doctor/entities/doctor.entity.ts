import { IDoctor, IPatient } from "@common/lib";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseModel } from "../../../shared/base-entity/base.entity";
import { Patient } from "../../patient/entities/patient.entity";

@Entity({ name: "doctors" })
export class Doctor extends BaseModel implements IDoctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  @Column({ type: "varchar", length: 120 })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  @Unique("Duplicate Email", ["email"])
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Patient, (patient) => patient.doctor, { cascade: true })
  patients: IPatient[];
}
