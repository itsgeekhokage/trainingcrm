/** @format */

import React, { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("trainingcrm"));
    if (!storedUser) {
      handleLogout();
    } else {
      setUser(storedUser);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("trainingcrm");
    navigate("/");
  };

  return (
    <div style={{ position: "absolute", right: "5px", top : "5px" }}>
      <IconButton
        onClick={handleMenuOpen}
        sx={{ color: "warning" }}>
        {user?.profile_pic ? (
          <Avatar src={user.profile_pic} />
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        {user && (
          <>
            <MenuItem disabled>
              <Typography variant="body1">{user.user_name || "User"}</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant="body1">{user.mobile_number || "Mobile"}</Typography>
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
