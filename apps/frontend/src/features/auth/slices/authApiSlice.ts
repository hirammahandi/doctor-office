import { IAuthentication, IDoctor, ISuccessResponse } from "@common/lib";
import { apiSlice } from "../../../store/api/apiSlice";
import { LoginSchema, SignupSchema } from "../types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ISuccessResponse<IAuthentication>, LoginSchema>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation<ISuccessResponse<IDoctor>, SignupSchema>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
