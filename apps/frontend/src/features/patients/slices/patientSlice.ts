import { IMedicalRecord } from "@common/lib";
import { GridRowId } from "@mui/x-data-grid";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared";
import { EditPatientSchema } from "../types";
import { getPatientDataToEditAndMedicalRecords } from "../utils";
import { editPatient, getPatientById } from "./patientsApiSlices";

type InitialState = {
  patientIdsToRemove: GridRowId[];
  patientToEdit: EditPatientSchema;
  patientMedicalRecords: IMedicalRecord[];
};

const initialState: InitialState = {
  patientIdsToRemove: [],
  patientToEdit: {} as EditPatientSchema,
  patientMedicalRecords: [],
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientIdsToRemove: (state, action: PayloadAction<GridRowId[]>) => {
      state.patientIdsToRemove = action.payload;
    },
    setPatientToNull: (state) => {
      state.patientToEdit = {} as EditPatientSchema;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getPatientById.matchFulfilled, (state, action) => {
        const { medicalRecords, patientToEdit } = getPatientDataToEditAndMedicalRecords(
          action.payload
        );
        state.patientToEdit = patientToEdit;
        state.patientMedicalRecords = medicalRecords;
      })
      .addMatcher(getPatientById.matchRejected, (state) => {
        state.patientToEdit = {} as EditPatientSchema;
      })
      .addMatcher(editPatient.matchFulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          const { medicalRecords, patientToEdit } = getPatientDataToEditAndMedicalRecords(data);
          state.patientToEdit = patientToEdit;
          state.patientMedicalRecords = medicalRecords;
        }
      });
  },
});

// SELECTORS
export const selectPatientsIdsToRemove = (state: RootState) => state.patient.patientIdsToRemove;
export const selectPatient = (state: RootState) => state.patient.patientToEdit;
export const selectMedicalRecordsByPatient = (state: RootState) =>
  state.patient.patientMedicalRecords;

export const selectPatientFullName = createSelector(
  selectPatient,
  (patient) => ` ${patient.name} ${patient.lastName}`
);

// ACTIONS
export const { setPatientIdsToRemove, setPatientToNull } = patientSlice.actions;
