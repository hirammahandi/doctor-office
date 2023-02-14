import { IBaseModel } from "./IBaseModel";
import { IMedicalRecord } from "./IMedicalRecord";
import { IDoctor } from "./IMedical";

export interface IPatient extends IBaseModel {
  id: number;
  name: string;
  lastName: string;
  email: string;
  ci: string;
  address: string;
  medicalRecords: IMedicalRecord[];
  doctor: IDoctor;
}
