import { Box, Typography } from "@mui/material";
import { ReactNode, memo } from "react";

type Props = {
  title: string;
  subtitle: ReactNode;
};

const Header = ({ title, subtitle }: Props) => (
  <Box mb="30px">
    <Typography variant="h3" fontWeight="bold" mb="5px">
      {title}
    </Typography>
    <Typography variant="h4">{subtitle}</Typography>
  </Box>
);

export default memo(Header);
