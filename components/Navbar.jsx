import React, { useEffect, useState } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Hidden, Menu } from "@material-ui/core";
import { AccountCircle, PersonAdd } from "@material-ui/icons";
import Link from "next/link";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between w-full px-10 text-lg text-zinc-900 bg-white h-[5rem] z-10 shadow-[0_5px_10px_0px_rgba(0,0,0,0.25)]">
      <span className="text-2xl font-semibold">
        <Link href="/">Habit Tracker</Link>
      </span>
      {/* {Desktop Menu} */}
      <Hidden smDown>
        <MenuList className="flex justify-between">
          <MenuItem className="pr-4 block hover:text-purple-500">
            <a
              href="https://github.com/alicja1bobko/Habit-Tracker"
              target="_blank"
            >
              <GitHubIcon />
            </a>
          </MenuItem>

          <Link className="px-2 block hover:text-purple-500" href="#">
            <MenuItem>Sign In</MenuItem>
          </Link>

          <Link
            className="px-2 block hover:text-purple-400 text-purple-500"
            href="/sign-up"
          >
            <MenuItem>Sign Up</MenuItem>
          </Link>
        </MenuList>
      </Hidden>

      {/* {MobileMenu} */}

      <Hidden mdUp>
        <IconButton
          aria-label="show more"
          aria-controls="mobile-menu-list"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <MenuIcon className="scale-125" />
        </IconButton>
      </Hidden>
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
  );
};

export default Navbar;
