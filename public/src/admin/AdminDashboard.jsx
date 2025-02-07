/** @format */

import React from "react";
import { Box, Typography, Grid, Card, CardActionArea } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AdminDashboard = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminDashboard;
