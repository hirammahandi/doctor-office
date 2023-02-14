import { IPatient } from "@common/lib";
import { ColumnDataType } from "../types";
import { formatDate } from "../../../shared";

export const columnsPatient: ColumnDataType<IPatient> = [
  {
    field: "ci",
    headerName: "CI",
    cellClassName: "name-column-cell",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.3,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 0.3,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.3,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 0.5,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    valueFormatter: ({ value }) => formatDate(value),
    valueGetter: ({ value }) => value,
  },
];

export const typographyStyles = {
  variant: "h5",
  color: "initial",
  gutterBottom: true,
  display: "flex",
  alignItems: "center",
  gap: 1,
} as const;

export const linkTextContent = "Create medical record";
