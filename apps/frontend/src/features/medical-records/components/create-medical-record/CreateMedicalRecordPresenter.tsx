import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Paper } from "@mui/material";
import ErrorAlert from "../../../../components/ErrorAlert";
import GoBackButton from "../../../../components/GoBackButton";
import Header from "../../../../components/Header";
import RichTextEditor from "../../../../components/RichTextEditor";
import { useCreateMedicalRecord } from "../../hooks";
import { CreateMedicalRecordSchema } from "../../types";

type Props = ReturnType<typeof useCreateMedicalRecord>;

const CreateMedicalRecordPresenter = ({ values, actions }: Props) => {
  const { handleSubmit, handleCreateMedicalRecord } = actions;
  const { control, errors, isError, errorResponse, isLoading } = values;

  return (
    <>
      <Header title="MEDICAL RECORDS" subtitle="Create new medical record" />
      {isError && <ErrorAlert error={errorResponse} />}
      <GoBackButton />
      <Grid
        component={Paper}
        direction="column"
        container
        justifyContent="space-between"
        padding={4}
      >
        <form onSubmit={handleSubmit(handleCreateMedicalRecord)}>
          <Grid item xs={12} mb="30px">
            <RichTextEditor<CreateMedicalRecordSchema>
              control={control}
              errors={errors}
              label="Description"
              name="description"
            />
          </Grid>
          <Grid item display="flex">
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              loading={isLoading}
              sx={{ marginLeft: "auto" }}
            >
              Create
            </LoadingButton>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default CreateMedicalRecordPresenter;
