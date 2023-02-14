import { Box } from "@mui/material";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { withRedirect } from "../components/layouts/RedirectToProfile";

const Custom404 = () => {
  return (
    <DashboardLayout>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        404 - Page Not Found
      </Box>
    </DashboardLayout>
  );
};

export default withRedirect(Custom404);
