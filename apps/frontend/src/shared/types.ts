import { makeStore } from "../store";
import { CLIENT_ROUTES } from "./routes";

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type PageRoute = {
  id: string;
  page: Page;
  route: CLIENT_ROUTES;
  icon: JSX.Element;
};

export type Page = "Profile" | "Patients" | "Medical Records" | "Logout";
