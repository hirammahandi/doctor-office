import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Patient } from "../entities/patient.entity";

// TODO: * Event subscriber for typeorm actions
@EventSubscriber()
export class PatientSubscriber implements EntitySubscriberInterface<Patient> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Patient;
  }

  async beforeInsert(_event: InsertEvent<Patient>) {
    console.log("BEFORE_INSERT");
  }
}
