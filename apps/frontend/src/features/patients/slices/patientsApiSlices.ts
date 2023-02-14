import { IPatient, ISuccessResponse } from "@common/lib";
import { GridRowId } from "@mui/x-data-grid";
import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { RootState } from "../../../shared";
import { apiSlice } from "../../../store/api/apiSlice";
import { CreatePatientSchema, EditPatientSchema } from "../types";

const patientAdapter = createEntityAdapter<IPatient>();

const initialState = patientAdapter.getInitialState();

export const patientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<EntityState<IPatient>, void>({
      query: () => ({
        url: "/patient",
        method: "GET",
      }),
      transformResponse: (response: ISuccessResponse<IPatient[]>) => {
        const patients = response.data;
        return patientAdapter.setAll(initialState, patients);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: "Patient" as const,
                id,
              })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),
    getPatientById: builder.query<IPatient, number>({
      query: (patientId) => ({
        url: `/patient/${patientId}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Patient", id: result?.id }],
      transformResponse: (response: ISuccessResponse<IPatient>) => {
        return response.data;
      },
    }),
    createPatient: builder.mutation<ISuccessResponse<IPatient>, CreatePatientSchema>({
      query: (body) => ({
        url: "/patient",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    editPatient: builder.mutation<ISuccessResponse<IPatient>, EditPatientSchema>({
      query: (body) => ({
        url: "/patient",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, args) => [{ type: "Patient", id: args.id }],
    }),
    removePatients: builder.mutation<ISuccessResponse<IPatient[]>, GridRowId[]>({
      query: (patientsIds) => ({
        url: `/patient/remove-patients`,
        method: "DELETE",
        body: { patientsIds },
      }),
      invalidatesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Patient" as const,
                id,
              })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

// Hooks
export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useRemovePatientsMutation,
  useEditPatientMutation,
  util: { getRunningQueriesThunk },
} = patientsApiSlice;

// Selectors
export const selectPatientsResult = patientsApiSlice.endpoints.getPatients.select();

export const selectPatientsData = createSelector(
  selectPatientsResult,
  (patientsResult) => patientsResult.data
);

export const {
  selectAll: selectAllPatients,
  selectById: selectPatientById,
  selectIds: selectPatientIds,
} = patientAdapter.getSelectors((state: RootState) => selectPatientsData(state) ?? initialState);

// Endpoints
export const { getPatients, getPatientById, editPatient } = patientsApiSlice.endpoints;
