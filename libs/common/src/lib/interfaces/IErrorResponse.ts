export interface IErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface IErrorObject {
  readonly object: IError;
}

export interface IError {
  entity: string;
  property: string;
  value: unknown;
}
