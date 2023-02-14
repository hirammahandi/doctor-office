import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetDoctor } from "../../shared/decorators";
import { JwtGuard } from "../authentication/guard";
import { CreatePatientDto, UpdatePatientDto } from "./dto";
import { PatientService } from "./patient.service";

@ApiTags("patients")
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(
    @GetDoctor("id", ParseIntPipe) doctorId: number,
    @Body() createPatientDto: CreatePatientDto
  ) {
    return this.patientService.create(doctorId, createPatientDto);
  }

  @Get()
  findAll(@GetDoctor("id", ParseIntPipe) doctorId: number) {
    return this.patientService.findAll(doctorId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

  @Patch()
  update(@Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(updatePatientDto);
  }

  @Delete("/remove-patients")
  remove(@Body("patientsIds") patientsIds: number[]) {
    return this.patientService.remove(patientsIds);
  }
}
