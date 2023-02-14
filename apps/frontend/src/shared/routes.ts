export const enum CLIENT_ROUTES {
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  PROFILE = "/dashboard/profile",
  PATIENTS = "/dashboard/patients",
  GET_PATIENT = "/dashboard/patients/{patientId}",
  EDIT_PATIENT = "/dashboard/patients/{patientId}/edit",
  MEDICAL_RECORDS = "/dashboard/medical-records",
  CREATE_MEDICAL_RECORD_BY_PATIENT = "/dashboard/medical-records/{patientId}/create",
  GET_MEDICAL_RECORD_BY_PATIENT = "/dashboard/patients/{patientId}/your-medical-records",
}
