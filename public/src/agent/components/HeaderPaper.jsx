/** @format */

import { Box, Paper, Typography, Link, Switch } from "@mui/material";
import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  updateHeaderVideoConfirmation,
  updatePdfConfirmation,
} from "../../apis/agent/headerApis";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getTestByMobileNumberAndHeaderCode } from "../../apis/agent/testApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const HeaderPaper = ({ user, data, loadHeadersData }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isPending,
    error,
    data: testResult,
  } = useQuery({
    queryKey: ["testData", user.mobile_number, data.header_code],
    queryFn: () =>
      getTestByMobileNumberAndHeaderCode(
        "tests",
        user.mobile_number,
        data.header_code
      ),
  });

  const videoMutation = useMutation({
    mutationFn: () =>
      updateHeaderVideoConfirmation({
        header_code: data.header_code,
        mobile_number: user.mobile_number,
      }),
    onMutate: () => {
      toast.info("Updating video completion status...");
    },
    onSuccess: () => {
      toast.success("Updated successfully!");
      queryClient.invalidateQueries(["headersData"]);
    },
    onError: () => {
      toast.error("Failed to update video status");
    },
  });

  const pdfMutation = useMutation({
    mutationFn: () =>
      updatePdfConfirmation({
        header_code: data.header_code,
        mobile_number: user.mobile_number,
      }),
    onMutate: () => {
      toast.info("Updating PDF completion status...");
    },
    onSuccess: () => {
      toast.success("Updated successfully!");
      queryClient.invalidateQueries(["headersData"]);
    },
    onError: () => {
      toast.error("Failed to update PDF status");
    },
  });

  const handleVideoChange = () => videoMutation.mutate();
  const handlePdfChange = () => pdfMutation.mutate();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: "100%",
        maxWidth: 400,
        textAlign: "center",
        borderRadius: 5,
        boxShadow: 3,
        border: "2px solid",
        borderColor:
          testResult === "pass"
            ? "rgba(5, 150, 10, 1)"
            : testResult === "fail"
            ? "rgba(200, 50, 50, 1)"
            : "rgba(255, 255, 255, 0.3)",
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
        {data.video_link != "" ? (
          <Box>
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
              checked={data?.completion[user?.mobile_number]?.video_completed}
              onChange={() => handleVideoChange()}
            />
          </Box>
        ) : (
          ""
        )}

        {data.pdf_link ? (
          <Box>
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
              checked={data?.completion[user?.mobile_number]?.pdf_completed}
              onChange={() => handlePdfChange()}
            />
          </Box>
        ) : (
          ""
        )}
        {(data?.completion[user?.mobile_number]?.video_completed &&
          data?.completion[user?.mobile_number]?.pdf_completed) ||
        (data?.video_link == "" && data?.pdf_link == "") ||
        (data?.completion[user?.mobile_number]?.video_completed &&
          data?.pdf_link == "") ||
        (data?.video_link == "" &&
          data?.completion[user?.mobile_number]?.pdf_completed) ? (
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
        ) : (
          <p></p>
        )}
      </Box>
    </Paper>
  );
};

export default HeaderPaper;
