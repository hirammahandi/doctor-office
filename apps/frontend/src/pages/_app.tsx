import { ThemeProvider } from "@emotion/react";
import { Box, colors, createTheme, CssBaseline } from "@mui/material";
import { Comfortaa } from "@next/font/google";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import { ToastContainer } from "react-toastify";

// CSS
import "../assets/css/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

/* 
 TODO: Check this feature
// import { default as AbortController } from "abort-controller";
// import { default as fetch, Headers, Request, Response } from "node-fetch";

// Object.assign(globalThis, {
  //   fetch,
  //   Headers,
  //   Request,
  //   Response,
  //   AbortController,
  // });
*/

const comfortaaFont = Comfortaa({
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: colors.teal[400],
      ...colors.teal,
    },
    secondary: {
      main: colors.teal[200],
    },
  },
  typography: {
    fontFamily: [comfortaaFont.style.fontFamily, "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  },
});

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & { getLayout?: (page: any) => any };
}

const App = ({ Component, ...rest }: CustomAppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const getLayout = Component.getLayout || ((page: any) => page);

  console.log(getLayout);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNProgress />
        <Box sx={{ minHeight: "100vh" }}>{getLayout(<Component {...props.pageProps} />)}</Box>
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
