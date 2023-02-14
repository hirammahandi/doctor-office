import { IBaseModel } from "./IBaseModel";
import { IPatient } from "./IPatient";

export interface IMedicalRecord extends IBaseModel {
  id: number;
  description: string;
  patient: IPatient;
}
