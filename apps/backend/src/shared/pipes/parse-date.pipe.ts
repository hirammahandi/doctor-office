import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

// @note Pipes
@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string) {
    const isInvalidDate = isNaN(Date.parse(value));
    if (isInvalidDate) {
      throw new BadRequestException("Invalid Date");
    }

    return new Date();
  }
}
