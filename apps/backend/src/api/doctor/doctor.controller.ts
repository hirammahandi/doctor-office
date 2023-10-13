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
import { ApiTags } from "@nestjs/swagger";
import { GetDoctor } from "../../shared/decorators";
import { JwtGuard } from "../authentication/guard";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto, UpdateDoctorDto } from "./dto";

@ApiTags("doctors")
@Controller("doctor")
@UseGuards(JwtGuard)
export class DoctorController {
  constructor(private readonly medicalService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.medicalService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.medicalService.findAll();
  }

  @Get("profile")
  findOne(@GetDoctor("id", ParseIntPipe) doctorId: number) {
    return this.medicalService.findOne(doctorId);
  }

  @Patch("profile")
  update(
    @GetDoctor("id", ParseIntPipe) doctorId: number,
    @Body() updateMedicalDto: UpdateDoctorDto
  ) {
    return this.medicalService.update(doctorId, updateMedicalDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicalService.remove(+id);
  }
}
