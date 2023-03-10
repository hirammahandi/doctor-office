import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { FC, ReactNode } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "../Sidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Doctor&apos;s Office - Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{ display: "flex", position: "relative", minHeight: "100vh" }}
      >
        <ProSidebarProvider>
          <SideBar />
          <Container
            maxWidth="xl"
            component="section"
            sx={{ width: "100%", py: 3 }}
          >
            {children}
          </Container>
        </ProSidebarProvider>
      </Box>
    </>
  );
};

export default DashboardLayout;
