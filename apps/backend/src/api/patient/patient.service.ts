import { ISuccessResponse, getMappedObject } from "@common/lib";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { FindOptionsOrder, FindOptionsRelations, FindOptionsSelect } from "typeorm";
import { AlreadyExistsException } from "../../shared/exceptions";
import { throwErrorIsInstanceOf } from "../../shared/utils";
import { DoctorRepository } from "../doctor/repositories/doctor.repository";
import { CreatePatientDto, UpdatePatientDto } from "./dto";
import { Patient } from "./entities";
import { PatientRepository } from "./repositories";

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository
  ) {}

  async create(
    doctorId: number,
    createPatientDto: CreatePatientDto
  ): Promise<ISuccessResponse<Patient>> {
    try {
      const foundDoctorByPatientEmail = await this.doctorRepository.findDoctorByPatientEmail(
        createPatientDto.email
      );

      if (foundDoctorByPatientEmail) {
        throw new AlreadyExistsException({
          entity: "doctor-patient",
          property: "email",
          value: createPatientDto.email,
        });
      }

      const foundPatientByEmail = await this.patientRepository.findByEmail(createPatientDto.email);

      if (foundPatientByEmail)
        throw new AlreadyExistsException({
          entity: "patient",
          property: "email",
          value: createPatientDto.email,
        });

      const foundPatientByCi = await this.patientRepository.findByCI(createPatientDto.ci);

      if (foundPatientByCi)
        throw new AlreadyExistsException({
          entity: "patient",
          property: "ci",
          value: createPatientDto.ci,
        });

      const doctor = await this.doctorRepository.findOne({
        where: {
          id: doctorId,
        },
      });

      if (!doctor) throw new NotFoundException("Doctor not found");

      const patient = this.patientRepository.create({
        ...createPatientDto,
        doctor,
      });

      await patient.save();

      const mappedPatient = getMappedObject(patient, "doctor");

      return { success: true, data: mappedPatient };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException, AlreadyExistsException);
      throw new InternalServerErrorException();
    }
  }

  async findAll(doctorId: number): Promise<ISuccessResponse<Patient[]>> {
    try {
      const patients = await this.patientRepository.find({
        where: { doctor: { id: doctorId } },
        order: { createdAt: { direction: "ASC" } },
      });

      return { success: true, data: patients };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(patientId: number): Promise<ISuccessResponse<Patient>> {
    try {
      const patient = await this.findOnePatientById({
        patientId,
        relations: {
          medicalRecords: true,
        },
        order: {
          medicalRecords: {
            createdAt: "DESC",
          },
        },
      });

      return { success: true, data: patient };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async update({
    id,
    ...restUpdatePatientDto
  }: UpdatePatientDto): Promise<ISuccessResponse<Patient>> {
    try {
      const patient = await this.findOnePatientById({ patientId: id });

      if (restUpdatePatientDto.email && patient.email !== restUpdatePatientDto.email) {
        const foundPatientByEmail = await this.patientRepository.findByEmail(
          restUpdatePatientDto.email
        );

        if (foundPatientByEmail)
          throw new AlreadyExistsException({
            entity: "patient",
            property: "email",
            value: restUpdatePatientDto.email,
          });

        const foundDoctorByPatientEmail = await this.doctorRepository.findDoctorByPatientEmail(
          restUpdatePatientDto.email
        );

        if (foundDoctorByPatientEmail) {
          throw new AlreadyExistsException({
            entity: "doctor-patient",
            property: "email",
            value: restUpdatePatientDto.email,
          });
        }
      }

      if (restUpdatePatientDto.ci && patient.ci !== restUpdatePatientDto.ci) {
        const foundPatientByCi = await this.patientRepository.findByCI(restUpdatePatientDto.ci);

        if (foundPatientByCi)
          throw new AlreadyExistsException({
            entity: "patient",
            property: "ci",
            value: restUpdatePatientDto.ci,
          });
      }

      for (const [key, value] of Object.entries(restUpdatePatientDto)) {
        if (value) patient[key] = value;
      }

      await patient.save();

      return { success: true, data: patient };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException, AlreadyExistsException);
      throw new InternalServerErrorException();
    }
  }

  async remove(patientIds: number[]): Promise<ISuccessResponse<Patient[]>> {
    try {
      const patientsPromises = patientIds.map(
        async (id) => await this.findOnePatientById({ patientId: id })
      );
      const patients = await Promise.all(patientsPromises);
      await this.patientRepository.remove(patients);

      return { success: true, data: patients };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async findOnePatientById({
    patientId,
    order,
    relations,
    select,
  }: {
    patientId: number;
    relations?: FindOptionsRelations<Patient>;
    select?: FindOptionsSelect<Patient>;
    order?: FindOptionsOrder<Patient>;
  }) {
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
      relations,
      select,
      order,
    });

    if (!patient) throw new NotFoundException("Patient not found");

    return patient;
  }
}
