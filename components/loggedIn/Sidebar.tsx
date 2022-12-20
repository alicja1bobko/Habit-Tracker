import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DrawerButton, DrawerListItem } from "./drawer";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="p-4">
      <p className="text-3xl text-[#2e822e]">Habit Tracker</p>

      <List>
        <DrawerListItem
          icon={<CheckCircleOutlineOutlinedIcon />}
          destination={"/habit-dashboard"}
        >
          Dashboard
        </DrawerListItem>
        <DrawerListItem icon={<AddTaskIcon />} destination={"/add-habit"}>
          Add habit
        </DrawerListItem>
        <DrawerListItem
          icon={<FormatListBulletedRoundedIcon />}
          destination={"/manage-habits"}
        >
          Manage habits
        </DrawerListItem>
        <DrawerListItem icon={<SettingsIcon />} destination={"/settings"}>
          Settings
        </DrawerListItem>
        <DrawerButton icon={<LogoutRoundedIcon />}>Logout</DrawerButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}

      <AppBar
        position="fixed"
        className="!bg-[#f87e3a] "
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: "block", sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ style: { border: "none" } }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
