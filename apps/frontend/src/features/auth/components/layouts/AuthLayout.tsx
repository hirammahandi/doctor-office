import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import HeroImage from "../../../../assets/images/hero_in_bg_3.jpg";
import { footerSigninMessage, footerSignupMessage } from "../../constants";

type Props = { children: ReactNode; authPage: "signin" | "signup" };

const AuthLayout = ({ children, authPage }: Props) => {
  const footerMessage =
    authPage === "signin" ? footerSigninMessage : footerSignupMessage;

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="stretch"
      wrap="wrap"
      height="100vh"
    >
      <Grid item xs={12} sm={5} md={4}>
        <Stack spacing={2} sx={{ padding: 6 }}>
          <Typography
            component="div"
            display="flex"
            gap={1}
            justifyContent="center"
            alignItems="center"
            variant="h5"
            fontWeight={800}
            color="primary"
          >
            <HomeWorkOutlinedIcon fontSize="large" color="primary" />
            Doctor&apos;s Office
          </Typography>
          <Divider flexItem />
          {children}
          <Typography variant="body1" color="initial" align="center">
            {footerMessage.paraph}
            <Button
              variant="text"
              color="primary"
              component={Link}
              sx={{ textTransform: "capitalize" }}
              href={footerMessage.href}
            >
              {footerMessage.buttonText}
            </Button>
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={0}
        sm={7}
        md={8}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <Image
            src={HeroImage}
            alt="login hero image"
            fill
            style={{ objectFit: "cover" }}
            priority
            // TODO: Check this feature from nextjs doc
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
