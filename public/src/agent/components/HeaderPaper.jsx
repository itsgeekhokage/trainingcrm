/** @format */

import { Box, Paper, Typography, Link, Switch } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  updateHeaderVideoConfirmation,
  updatePdfConfirmation,
} from "../../apis/agent/headerApis";
import { toast } from "react-toastify";

const HeaderPaper = ({ data, loadHeadersData }) => {

  const handleVideoChange = async () => {
    toast.info("Updating video completion status...");
    try {
      const res = await updateHeaderVideoConfirmation({
        header_code: data.header_code,
      });
      if (res) {
        toast.success("Updated successfully!");
        loadHeadersData();
      }
    } catch (error) {
      toast.error("Failed to update video status");
    }
  };

  const handlePdfChange = async () => {
    toast.info("Updating video completion status...");
    try {
      const res = await updatePdfConfirmation({
        header_code: data.header_code,
      });
      if (res) {
        toast.success("Updated successfully!");
        loadHeadersData();
      }
    } catch (error) {
      toast.error("Failed to update video status");
    }

  };

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
        alignItems={"center"}
        gap={2}
        mt={2}>
        {data.video_link != "" ? <Box>
          <Link
            component={RouterLink}
            to="/agent/video-player"
            state={{ link: data?.video_link }}
            sx={{
              textDecoration: "none",
              color: "warning.main",
              fontWeight: "bold",
              "&:hover": {
                color: "black",
              },
            }}>
            Video
          </Link>

          <Switch
            color="warning"
            size="small"
            checked={data.video_completed}
            onChange={() => handleVideoChange()}
          />
        </Box> : ""}

        {data.pdf_link ? <Box>
          <Link
            component={RouterLink}
            to="/agent/pdf-player"
            state={{ link: data?.pdf_link }}
            sx={{
              textDecoration: "none",
              color: "warning.main",
              fontWeight: "bold",
              "&:hover": {
                color: "black",
              },
            }}>
            PDF
          </Link>
          <Switch
            color="warning"
            size="small"
            checked={data.pdf_completed}
            onChange={() => handlePdfChange()}
          />
        </Box> : ""}
        {
          (data?.video_completed && data?.pdf_completed) || (data?.video_link == "" && data?.pdf_link == "") || (data?.video_completed && data?.pdf_link == "") || (data?.video_link == "" && data?.pdf_completed)
          ?
          <Link
            component={RouterLink}
            to="/agent/test"
            state={{ link: data }}
            sx={{
              textDecoration: "none",
              color: "warning.main",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                color: "black",
              },
            }}>
            Test
          </Link>
          :
          <p></p>
        }
      </Box>
    </Paper>
  );
};

export default HeaderPaper;
