import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const GoBackButton = () => {
  const router = useRouter();
  const navigateToBack = () => router.back();

  return (
    <Box mb="30px">
      <Button
        variant="outlined"
        color="primary"
        onClick={navigateToBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
    </Box>
  );
};

export default GoBackButton;
