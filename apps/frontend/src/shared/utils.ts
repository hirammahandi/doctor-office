import { IErrorResponse } from "@common/lib";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const isInstanceOfFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
  !!error && typeof error === "object" && "data" in error && "status" in error;

export const getErrorData = (error: FetchBaseQueryError): IErrorResponse => {
  return error.data as IErrorResponse;
};

export const getErrorsKey = <K extends string>(message: string, ...keys: K[]) =>
  keys.find((key) => message.includes(key));

export const formatDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
