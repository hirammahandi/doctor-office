import { IMedicalRecord, ISuccessResponse } from "@common/lib";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../../../store/api/apiSlice";
import { CreateMedicalRecordSchema } from "../types";

const medicalRecordAdapter = createEntityAdapter<IMedicalRecord>();

const initialMedicalRecordState = medicalRecordAdapter.getInitialState();

// TODO: Complete this feature
export const medicalRecordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    getMedicalRecords: builders.query<EntityState<IMedicalRecord>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: ISuccessResponse<IMedicalRecord[]>) => {
        const medicalRecords = response.data;
        return medicalRecordAdapter.setAll(initialMedicalRecordState, medicalRecords);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({
                type: "MedicalRecords" as const,
                id,
              })),
              { type: "MedicalRecords", id: "LIST" },
            ]
          : [{ type: "MedicalRecords", id: "LIST" }],
    }),
    createMedicalRecords: builders.mutation<
      ISuccessResponse<IMedicalRecord>,
      { patientId: string; body: CreateMedicalRecordSchema }
    >({
      query: ({ patientId, body }) => ({
        url: `/medical-records/${patientId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetMedicalRecordsQuery, useCreateMedicalRecordsMutation } =
  medicalRecordsApiSlice;
