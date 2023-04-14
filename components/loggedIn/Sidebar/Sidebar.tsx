import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { DrawerButton, DrawerListItem } from "./drawer";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../../../context/auth-context";
import Image from "next/image";
import { reactLocalStorage } from "reactjs-localstorage";
import logo from "../../../public/sprout.png";

const drawerWidth = 270;

interface Props {
  children: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // keep the selected tab state on page refresh
  useEffect(() => {
    setSelectedIndex(reactLocalStorage.get("index"));
  }, []);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (index === 4) {
      reactLocalStorage.set("index", 0);
    } else {
      reactLocalStorage.set("index", index);
    }
  };

  const drawer = (
    <div className="p-4 bg-background-gray h-full">
      <div className="flex justify-center mt-4">
        <Image
          alt="Profile photo"
          width={35}
          height={40}
          src={logo}
          className="flex-shrink-0 object-contain"
        />
        <h1 className="text-3xl text-light-green p-6 font-semibold">sprout</h1>
      </div>

      <List>
        <DrawerListItem
          icon={<CheckCircleOutlineOutlinedIcon />}
          destination={"/habit-dashboard"}
          selected={selectedIndex == 0}
          index={0}
          handleListItemClick={handleListItemClick}
        >
          Dashboard
        </DrawerListItem>
        <DrawerListItem
          icon={<AddTaskIcon />}
          destination={"/add-habit"}
          selected={selectedIndex == 1}
          index={1}
          handleListItemClick={handleListItemClick}
        >
          Add habit
        </DrawerListItem>
        <DrawerListItem
          icon={<FormatListBulletedRoundedIcon />}
          destination={"/manage-habits"}
          selected={selectedIndex == 2}
          index={2}
          handleListItemClick={handleListItemClick}
        >
          Manage habits
        </DrawerListItem>
        <DrawerListItem
          icon={<SettingsIcon />}
          destination={"/settings"}
          selected={selectedIndex == 3}
          index={3}
          handleListItemClick={handleListItemClick}
        >
          Settings
        </DrawerListItem>
        <DrawerButton
          icon={<LogoutRoundedIcon />}
          selected={selectedIndex == 4}
          index={4}
          handleListItemClick={handleListItemClick}
        >
          <button onClick={() => logout()}>Logout</button>
        </DrawerButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        className="!bg-light-orange"
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
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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

          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
