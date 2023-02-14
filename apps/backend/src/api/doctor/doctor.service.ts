import { ISuccessResponse, getMappedObject } from "@common/lib";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import * as argon from "argon2";
import { AlreadyExistsException } from "../../shared/exceptions";
import { throwErrorIsInstanceOf } from "../../shared/utils";
import { DoctorRepository } from "./repositories";
import { CreateDoctorDto, UpdateDoctorDto } from "./dto";
import { Doctor } from "./entities";

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<ISuccessResponse<Doctor>> {
    try {
      const foundDoctorByEmail = await this.doctorRepository.findByEmail(createDoctorDto.email);

      if (foundDoctorByEmail)
        throw new AlreadyExistsException({
          entity: "doctor",
          property: "email",
          value: createDoctorDto.email,
        });

      const hashedPassword = await argon.hash(createDoctorDto.password);

      const doctor = this.doctorRepository.create({
        ...createDoctorDto,
        password: hashedPassword,
      });

      await doctor.save();

      const mappedDoctor = getMappedObject(doctor, "password");

      return { success: true, data: mappedDoctor };
    } catch (error) {
      throwErrorIsInstanceOf(error, AlreadyExistsException);
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<ISuccessResponse<Doctor[]>> {
    try {
      const doctors = await this.doctorRepository.find({
        relations: ["patients"],
      });

      return { success: true, data: doctors };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<ISuccessResponse<Doctor>> {
    try {
      const findDoctor = await this.findOneDoctor(id);

      const mappedDoctor = getMappedObject(findDoctor, "password");

      return { success: true, data: mappedDoctor };
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateMedicalDto: UpdateDoctorDto): Promise<ISuccessResponse<Doctor>> {
    try {
      const doctor = await this.findOneDoctor(id);

      if (updateMedicalDto.email && updateMedicalDto.email !== doctor.email) {
        const foundDoctorByEmail = await this.doctorRepository.findByEmail(doctor.email);

        if (foundDoctorByEmail)
          throw new AlreadyExistsException({
            entity: "doctor",
            property: "email",
            value: updateMedicalDto.email,
          });
      }

      if (updateMedicalDto.password) {
        const hashedPassword = await argon.hash(updateMedicalDto.password);
        doctor.password = hashedPassword;
      }

      for (const [key, value] of Object.entries(updateMedicalDto)) {
        if (key !== "password") doctor[key] = value;
      }

      await doctor.save();

      const mappedDoctor = getMappedObject(doctor, "password");

      return { success: true, data: mappedDoctor };
    } catch (error) {
      Logger.error(error);
      throwErrorIsInstanceOf(error, NotFoundException, AlreadyExistsException);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<ISuccessResponse<Doctor>> {
    const doctor = await this.findOne(id);

    await this.doctorRepository.delete(id);

    return { ...doctor };
  }

  async findOneDoctor(id: number): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.findOne({
        where: { id },
      });

      if (!doctor) throw new NotFoundException("Doctor not found");

      return doctor;
    } catch (error) {
      throwErrorIsInstanceOf(error, NotFoundException);
      throw new InternalServerErrorException();
    }
  }
}
