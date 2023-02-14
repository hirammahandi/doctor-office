import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentials extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message,
        error: "Invalid Credentials",
      },
      HttpStatus.FORBIDDEN
    );
  }
}
