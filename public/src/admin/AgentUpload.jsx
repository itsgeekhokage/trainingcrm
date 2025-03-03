/** @format */

import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataUpload from "./components/DataUpload";
import JsonGrid from "./components/Table";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { uploadAgentData } from "../apis/admin/agent";
import { toast } from "react-toastify";
import agents_sample from "/data/agents_sample.csv?url";
import headers_sample from "/data/headers_sample.csv?url";
import sample_questions from "/data/sample_questions.csv?url";

const AgentUpload = () => {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [sample_file, set_sample_file] = useState(agents_sample);

  useEffect(() => {
    const pth = location.pathname?.split("/");
    if (pth.length > 3) {
      const path = pth[3];
      if (path === "agents") {
        setPage("Agents");
        set_sample_file(agents_sample);
      } else if (path === "questions") {
        setPage("Questions");
        set_sample_file(sample_questions);
      } else if (path === "headers") {
        setPage("Headers");
        set_sample_file(headers_sample);
      }
    }
  }, [location]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = () => {
    if (file) {
      setLoading(true);
      DataUpload(file, (data) => {
        setJsonData(data);
        setLoading(false);
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = await uploadAgentData(jsonData, page.toLowerCase());
      console.log(data.data, data.message);
      setJsonData([]);
      setFile(null);
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to upload data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = sample_file;
    link.setAttribute("download", sample_file.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 3,
        borderRadius: 3,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Navbar />
      <Typography
        variant="h4"
        color="primary"
        textAlign="center"
        fontWeight={600}
        mb={2}>
        {page} Dashboard
      </Typography>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}>
        <Button
          variant="outlined"
          textAlign="center"
          color="warning"
          mb={2}
          disabled={loading}>
          <Link
            to={`/admin/${page.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}>
            View all {page}
          </Link>
        </Button>

        <Button
          variant="outlined"
          color="success"
          onClick={handleDownloadSample}
          disabled={loading}>
          Download Sample File
        </Button>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}>
          <input
            accept=".csv"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              disabled={loading}>
              Choose File
            </Button>
          </label>
        </Box>

        <Box
          display="flex"
          gap={2}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleConvert}
            disabled={!file || loading}>
            Convert
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            disabled={!file || loading}>
            Save
          </Button>
        </Box>
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      <Box
        width={"100%"}
        mt={2}>
        {jsonData && <JsonGrid data={jsonData} />}
      </Box>
    </Paper>
  );
};

export default AgentUpload;
