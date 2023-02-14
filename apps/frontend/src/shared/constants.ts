import { IAuthentication } from "@common/lib";

export const BASE_URL = "http://localhost:3333/api";
export const TOKEN_NAME: keyof Pick<IAuthentication, "access_token"> =
  "access_token";

export const TOKEN_EXPIRES = new Date(
  (Math.floor(Date.now() / 1000) + 60 * 60 * 24) * 1000
);
