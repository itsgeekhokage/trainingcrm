/** @format */

import { Box, Paper, Typography, Link, Switch } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { updateHeaderVideoConfirmation, updatePdfConfirmation } from "../../apis/agent/headerApis";
import { toast } from "react-toastify";

const HeaderPaper = ({ data, loadHeadersData }) => {
  console.log(data)

  const handleVideoChange = () => {
    updateHeaderVideoConfirmation({header_code: data.header_code}).then(res => {
      console.log(res)
      loadHeadersData();
    })
    toast.info("your credentials are being updated...")
    toast.info("refresh the page to see the changes...")
  }

  const handlePdfChange = () => {
    updatePdfConfirmation({header_code: data.header_code}).then(res => {
      loadHeadersData();
    })
    toast.info("your credentials are being updated...");
    toast.info("refresh the page to see the changes...");
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}>
      <Typography
        variant="p"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "primary.main" }}>
        {data?.header_name}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mt={2}>
        <Link
          component={RouterLink}
          to="/agent/video-player"
          state={{ link: data?.video_link }}
          sx={{
            textDecoration: "none",
            color: "warning.main",
            fontWeight: "bold",
            borderBlockColor: "warning.main",
            px: 2,
            py: 1,
            borderRadius: 1,
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
          }}>
          Video
        </Link>
        {/* <Switch color="warning" checked={data.video_completed} onChange={() => handleVideoChange()}/> */}

        <Link
          component={RouterLink}
          to="/agent/pdf-player"
          state={{ link: data?.pdf_link }}
          sx={{
            textDecoration: "none",
            color: "warning.main",
            fontWeight: "bold",
            borderBlockColor: "warning.main",
            px: 2,
            py: 1,
            borderRadius: 1,
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
          }}>
          PDF
        </Link>
        {/* <Switch color="warning" checked={data.pdf_completed} onChange={() => handlePdfChange()}/> */}

        {
          // (data?.video_completed && data?.pdf_completed)
          // ?
          (<Link
          component={RouterLink}
          to="/agent/test"
          state={{ link: data }}
          sx={{
            textDecoration: "none",
            color: "warning.main",
            fontWeight: "bold",
            borderBlockColor: "warning.main",
            px: 2,
            py: 1,
            borderRadius: 1,
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "warning.dark",
            },
          }}>
          Test
        </Link>)
          // :
          // <p>complete video and audio first</p>
        }
      </Box>
    </Paper>
  );
};

export default HeaderPaper;
