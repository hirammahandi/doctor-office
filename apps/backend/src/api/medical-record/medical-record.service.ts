import { IMedicalRecord, ISuccessResponse, getMappedObject } from "@common/lib";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { FindOneOptions, MoreThanOrEqual } from "typeorm";
import { throwErrorIsInstanceOf } from "../../shared/utils";
import { PatientService } from "../patient/patient.service";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";
import { MedicalRecord } from "./entities";
import { MedicalRecordRepository } from "./repositories";
import { SearchMedicalRecordByDateDto } from "./dto/search-medical-record-by-date.dto";

@Injectable()
export class MedicalRecordService {
  constructor(
    private readonly medicalRecordRepository: MedicalRecordRepository,
    private readonly patientService: PatientService
  ) {}

  async create(
    patientId: number,
    { description }: CreateMedicalRecordDto
  ): Promise<ISuccessResponse<MedicalRecord>> {
    try {
      const patient = await this.patientService.findOnePatientById({ patientId });

      const medicalRecord = this.medicalRecordRepository.create({
        description,
        patient,
      });

      await medicalRecord.save();

      const mappedMedicalRecord = getMappedObject(medicalRecord, "patient");
      return { success: true, data: mappedMedicalRecord };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async findAllByPatientId(patientId: number): Promise<ISuccessResponse<MedicalRecord[]>> {
    try {
      const patient = await this.patientService.findOnePatientById({ patientId });

      const clinicHistories = await this.medicalRecordRepository.find({
        where: {
          patient: { id: patient.id },
        },
      });

      return { success: true, data: clinicHistories };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async findByDate(
    patientId: number,
    searchMedicalRecordByDateDto: SearchMedicalRecordByDateDto
  ): Promise<ISuccessResponse<Omit<IMedicalRecord, "patient">[]>> {
    try {
      const { dateToSearch } = searchMedicalRecordByDateDto;
      const findPatient = await this.patientService.findOnePatientById({ patientId });

      const findMedicalRecordsByDate = await this.medicalRecordRepository.findBy({
        patient: { id: findPatient.id },
        updatedAt: MoreThanOrEqual(dateToSearch),
      });

      const mappedMedicalRecordByDate = findMedicalRecordsByDate.map((medicalRecord) =>
        getMappedObject(medicalRecord, "patient")
      );

      return { success: true, data: mappedMedicalRecordByDate };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async findOne(medicalRecordId: number): Promise<ISuccessResponse<MedicalRecord>> {
    try {
      const medicalRecord = await this.findOneMedicalRecord({
        where: {
          id: medicalRecordId,
        },
      });

      return { success: true, data: medicalRecord };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async update(
    medicalRecordId: number,
    updateMedicalRecordDto: UpdateMedicalRecordDto
  ): Promise<ISuccessResponse<MedicalRecord>> {
    try {
      const medicalRecord = await this.findOneMedicalRecord({
        where: {
          id: medicalRecordId,
        },
      });

      for (const [key, value] of Object.entries(updateMedicalRecordDto)) {
        medicalRecord[key] = value;
      }

      await medicalRecord.save();

      return { success: true, data: medicalRecord };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async remove(medicalRecordId: number): Promise<ISuccessResponse<MedicalRecord>> {
    try {
      const medicalRecord = await this.findOneMedicalRecord({
        where: { id: medicalRecordId },
      });

      await this.medicalRecordRepository.delete(medicalRecord.id);
      return { success: true, data: medicalRecord };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async findOneMedicalRecord(options: FindOneOptions<MedicalRecord>) {
    const medicalRecord = await this.medicalRecordRepository.findOne(options);
    if (!medicalRecord) throw new NotFoundException("Clinic History not found");
    return medicalRecord;
  }
}
