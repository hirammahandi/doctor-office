import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from "./dto";
import { SearchMedicalRecordByDateDto } from "./dto/search-medical-record-by-date.dto";
import { MedicalRecordService } from "./medical-record.service";
@ApiTags("medical records")
@ApiBearerAuth()
// @UseGuards(JwtGuard)
@Controller("medical-records")
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post(":patientId")
  @ApiOperation({ summary: "Create medical records by patient id" })
  create(
    @Param("patientId", ParseIntPipe) patientId: number,
    @Body() createMedicalRecordDto: CreateMedicalRecordDto
  ) {
    return this.medicalRecordService.create(patientId, createMedicalRecordDto);
  }

  @Get(":patientId")
  @ApiOperation({ summary: "Find all medical records by patient id" }) // TODO: * Way to add description to a controller
  findAllByPatientId(@Param("patientId", ParseIntPipe) patientId: number) {
    return this.medicalRecordService.findAllByPatientId(patientId);
  }

  @Post(":patientId/search-by-date")
  @ApiOperation({ summary: "Search medical records for patient by date" })
  findByDate(
    @Param("patientId", ParseIntPipe) patientId: number,
    @Body() dateToSearch: SearchMedicalRecordByDateDto
  ) {
    return this.medicalRecordService.findByDate(patientId, dateToSearch);
  }

  @Get(":medicalRecordId")
  @ApiOperation({ summary: "Find one medical records by medical record id" })
  findOne(@Param("medicalRecordId", ParseIntPipe) medicalRecordId: number) {
    return this.medicalRecordService.findOne(medicalRecordId);
  }

  @Patch(":medicalRecordId")
  @ApiOperation({ summary: "Update medical records by patient id" })
  update(
    @Param("medicalRecordId", ParseIntPipe) medicalRecordId: number,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordService.update(medicalRecordId, updateMedicalRecordDto);
  }

  @Delete(":medicalRecordId")
  @ApiOperation({
    summary: "Delete medical records by patient id",
  })
  @ApiResponse({ description: "Return a deleted medical record", status: 200 })
  remove(@Param("medicalRecordId", ParseIntPipe) medicalRecordId: number) {
    return this.medicalRecordService.remove(medicalRecordId);
  }
}
