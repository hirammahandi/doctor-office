import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "../features/auth/slices/authSlice";
import { profileSlice } from "../features/doctors/slices/profileSlice";
import { patientSlice } from "../features/patients/slices/patientSlice";
import { AppStore } from "../shared";
import { apiSlice } from "./api/apiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
  [patientSlice.name]: patientSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDM) => getDM().concat(apiSlice.middleware),
    devTools: true,
  });

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
