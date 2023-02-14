import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared";
import { profileApiSlice } from "./profileApiSlices";

const initialState: { username: string | null } = {
  username: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    removeUsername: (state) => {
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    //TODO: * Using extraReducer to get the payload from a apiSlice
    builder
      .addMatcher(profileApiSlice.endpoints.getDoctor.matchFulfilled, (state, { payload }) => {
        const { data, success } = payload;
        if (success) {
          const username = `${data.name} ${data.lastName}`.trim();
          state.username = username;
        }
      })
      .addMatcher(profileApiSlice.endpoints.getDoctor.matchRejected, (state) => {
        state.username = null;
      });
  },
});

export const { removeUsername } = profileSlice.actions;

// Selectors
export const selectUsername = (state: RootState) => state.profile.username;
