import { IBaseModel } from "./IBaseModel";
import { IPatient } from "./IPatient";

export interface IDoctor extends IBaseModel {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  patients: IPatient[];
}
