/** @format */

import React, { useEffect, useState } from "react";
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
    navigate(`/admin/upload/${path}`);
    setOpen(false);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("trainingcrm");
    navigate("/");
  }

  useEffect(() => {
    if (!sessionStorage.getItem("trainingcrm")) {
      navigate("/");
    }
    const user = JSON.parse(sessionStorage.getItem("trainingcrm"));
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left : 0, zIndex: 1000 }}>
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
        <List sx={{ width: 250, position: 'absolute', bottom: 0 }}>
          <ListItemButton>
            <ListItemText primary="Admin" />
          </ListItemButton>
          <ListItemButton onClick={() => handleLogOut()}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
