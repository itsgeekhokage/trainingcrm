/** @format */

import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { authApi } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const endpoint = isAdmin ? "admin/auth" : "agents/auth";
      const response = await authApi(endpoint, {
        mobile_number: mobileNumber,
        password,
      });
      console.log("Login Response:", response);

      if (isAdmin) {
        sessionStorage.setItem("trainingcrm", JSON.stringify(response.data));
        navigate("/admin/h");
      } else {
        sessionStorage.setItem("trainingcrm", JSON.stringify(response.data));
        navigate("/agent/h");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleAdminCheck = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <Container maxWidth="sm" display="flex" justifyContent="center" >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border={`2px solid ${theme.palette.warning.main}`}
        width={"350px"}
        padding={"30px"}
        backgroundColor={theme.palette.background.paper}
        borderRadius={theme.shape.borderRadius}
        boxShadow={3}
        margin={"auto"}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="warning.main"
        >
         Sign In
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          marginBottom={2}>
          <Switch
            checked={isAdmin}
            onChange={handleAdminCheck}
            color="warning"
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography
            variant="body1"
            color="textSecondary">
            Signing in as admin
          </Typography>
        </Box>

        <form onSubmit={handleSignIn}>
          <TextField
            label="Mobile Number"
            type="text"
            fullWidth
            margin="normal"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            fullWidth
            style={{ marginTop: "20px" }}>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
