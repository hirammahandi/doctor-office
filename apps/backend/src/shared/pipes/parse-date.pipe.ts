import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

// TODO: Check how work pipes
@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: Date, _metadata: ArgumentMetadata) {
    const isInvalidDate = isNaN(Date.parse(value.toString()));
    if (isInvalidDate) {
      throw new BadRequestException("Invalid Date");
    }

    return new Date();
  }
}
