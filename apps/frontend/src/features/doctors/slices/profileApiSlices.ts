import { IDoctor, ISuccessResponse } from "@common/lib";
import { apiSlice } from "../../../store/api/apiSlice";
import { UpdateDoctorBody } from "../types";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctor: builder.query<
      ISuccessResponse<Omit<IDoctor, "patients" | "password">>,
      void
    >({
      query: () => ({
        url: `/doctor/profile`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: (result) => [
        { type: "Doctor" },
        { type: "Doctor", id: result?.data.id },
      ],
    }),
    updateDoctor: builder.mutation<ISuccessResponse<IDoctor>, UpdateDoctorBody>(
      {
        query: (body) => ({
          url: `/doctor/profile`,
          method: "PATCH",
          body,
        }),
        onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
          const patchResulted = dispatch(
            profileApiSlice.util.updateQueryData(
              "getDoctor",
              undefined,
              (draftDoctor) => {
                if (body.email) draftDoctor.data.email = body.email;
                if (body.name) draftDoctor.data.name = body.name;
                if (body.lastName) draftDoctor.data.lastName = body.lastName;
              }
            )
          );
          try {
            await queryFulfilled;
          } catch (error) {
            patchResulted.undo();
          }
        },
      }
    ),
  }),
  overrideExisting: true,
});

// Hooks
export const {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
  util: { getRunningQueriesThunk },
} = profileApiSlice;

// Selectors
export const selector = profileApiSlice.endpoints.getDoctor.select();

// Endpoints
export const { getDoctor } = profileApiSlice.endpoints;
