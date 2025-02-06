/** @format */

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleNavigation = (path) => {
    navigate(`/upload/${path}`);
    setOpen(false);
  };

  return (
    <>
      {/* Top AppBar */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <Typography variant="h6">Menu</Typography>
          </ListItem>
          <ListItemButton onClick={() => handleNavigation("headers")}>
            <ListItemText primary="Upload Headers" />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("agents")}>
            <ListItemText primary="Upload Agents" />
          </ListItemButton>
          <ListItemButton onClick={() => handleNavigation("questions")}>
            <ListItemText primary="Upload Questions" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
