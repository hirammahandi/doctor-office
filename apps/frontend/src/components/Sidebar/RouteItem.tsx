import Link from "next/link";
import { ReactNode } from "react";
import { MenuItem } from "react-pro-sidebar";
import { CLIENT_ROUTES, Page } from "../../shared";

type ItemProps = {
  page: Page;
  route: CLIENT_ROUTES;
  icon: ReactNode;
  currentRoute: string;
};

const RouteItem = ({ icon, currentRoute, page, route }: ItemProps) => (
  <MenuItem
    component={<Link href={route} />}
    active={currentRoute === route}
    icon={icon}
  >
    {page}
  </MenuItem>
);

export default RouteItem;
