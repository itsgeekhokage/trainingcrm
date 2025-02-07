import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HelpIcon from "@mui/icons-material/Help";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminHome = () => {
    const navigate = useNavigate();

    const items = [
      {
        icon: <GroupIcon fontSize="large" />,
        label: "Upload Agents",
        path: "/admin/upload/agents",
      },
      {
        icon: <HelpIcon fontSize="large" />,
        label: "Upload Questions",
        path: "/admin/upload/questions",
      },
      {
        icon: <CloudUploadIcon fontSize="large" />,
        label: "Upload Headers",
        path: "/admin/upload/headers",
      },
    ];

  return (
    <Box
      textAlign="center"
      sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: 3 }}>
        {items.map((item, index) => (
          <Grid
            item
            key={index}>
            <Card
              sx={{
                width: 150,
                height: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.3s",
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
                cursor: "pointer",
              }}
              onClick={() => navigate(item.path)}>
              {item.icon}
              <Typography
                variant="subtitle1"
                sx={{ mt: 1 }}>
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminHome
