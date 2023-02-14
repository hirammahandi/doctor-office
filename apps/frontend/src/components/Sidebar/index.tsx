import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Avatar,
  Box,
  colors,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  useProSidebar,
} from "react-pro-sidebar";
import {
  removeUsername,
  selectUsername,
} from "../../features/doctors/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeToken } from "../../lib/cookies";
import { CLIENT_ROUTES } from "../../shared";
import { PAGES } from "./PagesRoutes";
import RouteItem from "./RouteItem";

const SideBar = () => {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const { toggleSidebar, collapseSidebar, collapsed, broken } = useProSidebar();
  const { pathname, push } = useRouter();
  const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebar", "false");
  const parseIsCollapsed = JSON.parse(isCollapsed ?? String(collapsed));

  useEffect(() => {
    if (!collapsed && broken) {
      toggleSidebar(false);
    }
  }, [pathname, broken, collapsed, toggleSidebar]);

  const handleCollapseSidebarMenu = () => {
    if (isCollapsed) {
      setIsCollapsed(String(!collapsed));
    }
    collapseSidebar();
  };

  const handleLogout = () => {
    removeToken();
    push(CLIENT_ROUTES.SIGNIN).then(() => dispatch(removeUsername()));
  };

  return (
    <ProSidebar
      defaultCollapsed={parseIsCollapsed}
      backgroundColor={colors.teal[400]}
      rootStyles={{
        borderRight: "none",
      }}
      customBreakPoint="600px"
    >
      <Menu
        closeOnClick
        rootStyles={{
          height: "100%",
        }}
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0) {
              return {
                color: active ? "#eee" : "#212121",
                backgroundColor: "transparent",
                ":hover": {
                  color: "#eee",
                  backgroundColor: "transparent",
                },
              };
            }
            return undefined;
          },
        }}
      >
        {/* LOGO AND MENU ICON */}
        {!broken && (
          <MenuItem
            onClick={handleCollapseSidebarMenu}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  component="div"
                  display="flex"
                  gap={1}
                  justifyContent="center"
                  alignItems="center"
                  variant="h4"
                  fontWeight={800}
                  color="#fff"
                  sx={{ marginTop: "6px" }}
                >
                  <HomeWorkOutlinedIcon fontSize="large" />
                  D&apos;Office
                </Typography>
                <IconButton
                  onClick={() => toggleSidebar()}
                  sx={{ color: "#000" }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
        )}

        {/* USER */}
        {!collapsed && (
          <Box sx={{ mb: "25px" }}>
            <Stack direction="row" justifyContent="center">
              <Avatar
                sx={{ width: 100, height: 100, cursor: "pointer" }}
                tabIndex={0}
                role="button"
                aria-hidden="true"
              />
            </Stack>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold" sx={{ mt: "10px" }}>
                {username ?? <Skeleton />}
              </Typography>
            </Box>
          </Box>
        )}

        {/* MENU ITEMS */}
        <Box
          pl={collapsed ? undefined : "10%"}
          display="flex"
          flexDirection="column"
        >
          {PAGES.map(({ id, icon, page, route }, index) => (
            <RouteItem
              key={id}
              page={page}
              route={route}
              icon={
                collapsed ? (
                  <Tooltip title={page} placement="right-end" arrow>
                    {icon}
                  </Tooltip>
                ) : (
                  icon
                )
              }
              currentRoute={pathname}
            />
          ))}
          <MenuItem
            icon={<LogoutOutlinedIcon />}
            onClick={handleLogout}
            rootStyles={{ marginTop: "100%" }}
          >
            Logout
          </MenuItem>
        </Box>
      </Menu>
    </ProSidebar>
  );
};

export default SideBar;
