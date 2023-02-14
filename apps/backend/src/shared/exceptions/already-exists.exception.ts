import { IError, IErrorObject } from "@common/lib";
import { HttpException, HttpStatus } from "@nestjs/common";

export class AlreadyExistsException
  extends HttpException
  implements IErrorObject
{
  constructor(readonly object: IError) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `A ${object.entity} with ${object.property}: ${object.value} already exists`,
        error: "Already Exists",
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
