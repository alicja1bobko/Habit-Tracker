import React, { useState } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Menu } from "@material-ui/core";
import { AccountCircle, PersonAdd } from "@material-ui/icons";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between w-full px-10 text-lg text-zinc-900 bg-white h-[4rem] z-10 shadow-[0_5px_10px_0px_rgba(0,0,0,0.25)]">
        <span className="text-2xl font-semibold" data-test="appName">
          <Link href="/">Habit Tracker</Link>
        </span>
        {/* {Desktop Menu} */}
        <MenuList
          className="flex justify-between"
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          <MenuItem className="pr-4 block hover:text-purple-500">
            <a
              href="https://github.com/alicja1bobko/Habit-Tracker"
              target="_blank"
            >
              <GitHubIcon />
            </a>
          </MenuItem>

          <Link
            className={`px-2 block hover:text-purple-400 ${
              router.pathname == "/sign-in" ? "text-purple-400" : "text-black"
            }`}
            href="/sign-in"
          >
            <MenuItem>Sign In</MenuItem>
          </Link>

          <Link
            className={`px-2 block hover:text-purple-400 ${
              router.pathname == "/sign-up" ? "text-purple-400" : "text-black"
            }`}
            href="/sign-up"
          >
            <MenuItem>Sign Up</MenuItem>
          </Link>
        </MenuList>

        {/* {MobileMenu} */}

        <Box sx={{ display: { md: "none", xs: "block" } }}>
          <IconButton
            aria-label="show more"
            aria-controls="mobile-menu-list"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <MenuIcon className="scale-125" />
          </IconButton>
        </Box>

        <Menu
          id="customized-menu"
          MenuListProps={{
            "aria-labelledby": "customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Link href="/sign-in">
            <MenuItem onClick={handleClose}>
              <IconButton>
                <AccountCircle />
              </IconButton>
              <p>Sign In </p>
            </MenuItem>
          </Link>
          <Link href="/sign-up">
            <MenuItem onClick={handleClose} disableRipple>
              <IconButton>
                <PersonAdd />
              </IconButton>
              <p>Sign Up</p>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleClose} disableRipple>
            <a
              href="https://github.com/alicja1bobko/Habit-Tracker"
              target="_blank"
              className="block"
            >
              <IconButton>
                <GitHubIcon />
              </IconButton>
              GitHub repository
            </a>
          </MenuItem>
        </Menu>
      </nav>
    </div>
  );
};

export default Navbar;
