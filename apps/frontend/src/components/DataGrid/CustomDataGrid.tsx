import { Box, colors } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const CustomDataGrid = (props: DataGridProps) => (
  <Box sx={{ mt: "40px", height: "75vh", width: "100%" }}>
    <DataGrid
      {...props}
      sx={{
        "&": {
          border: "none",
        },
        ".MuiDataGrid-cell": {
          borderBottom: "none",
        },
        ".name-column-cell": {
          color: "#2e7c67",
        },
        ".MuiDataGrid-columnHeaders": {
          bgcolor: colors.teal[400],
          borderBottom: "none",
          color: "#fff",
          ".MuiCheckbox-root": {
            color: "#fff !important",
          },
        },
        ".MuiDataGrid-virtualScroller": {
          bgcolor: "#f2f0f0",
          ".MuiCheckbox-root": {
            color: "#1e5245 !important",
          },
        },
        ".MuiDataGrid-footerContainer": {
          borderTop: "none",
          bgcolor: colors.teal[400],
          color: "#fff",
          ".MuiTablePagination-root": {
            color: "#fff",
            ".MuiTablePagination-actions button svg": {
              color: "#fff",
            },
          },
        },
        ".MuiDataGrid-iconButtonContainer svg": {
          color: "#fff",
        },
        ".MuiDataGrid-menuIcon svg": {
          color: "#fff",
        },
      }}
    />
  </Box>
);

export default CustomDataGrid;
