import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import { nanoid } from "@reduxjs/toolkit";
import { CLIENT_ROUTES, PageRoute } from "../../shared";

export const PAGES: PageRoute[] = [
  {
    id: nanoid(6),
    page: "Profile",
    route: CLIENT_ROUTES.PROFILE,
    icon: <PermIdentityOutlinedIcon />,
  },
  {
    id: nanoid(6),
    page: "Patients",
    route: CLIENT_ROUTES.PATIENTS,
    icon: <GroupsOutlinedIcon />,
  },
  {
    id: nanoid(6),
    page: "Medical Records",
    route: CLIENT_ROUTES.MEDICAL_RECORDS,
    icon: <HistoryEduOutlinedIcon />,
  },
];
