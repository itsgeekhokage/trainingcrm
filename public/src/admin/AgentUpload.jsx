/** @format */

import { Box, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataUpload from "./components/DataUpload";
import JsonGrid from "./components/Table";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { uploadAgentData } from "../apis/admin/agent";
import { toast } from "react-toastify";
import agents_sample from '/data/agents_sample.csv?url'
import headers_sample from '/data/headers_sample.csv?url'
import sample_questions from '/data/sample_questions.csv?url'

const AgentUpload = () => {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const location = useLocation();
  const [sample_file, set_sample_file] = useState(agents_sample);

  useEffect(()=>{
    var pth = location.pathname?.split('/')
    if(pth.length > 3){
      var path = pth[3]
      if(path === 'agents'){
        setPage('agents')
        set_sample_file(agents_sample)
      } else if(path === 'questions'){
        setPage('questions')
        set_sample_file(sample_questions)
      } else if(path === 'headers'){
        setPage('headers')
        set_sample_file(headers_sample)
        }
    }
  }, [location])

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = () => {
    if (file) {
      let read_data = DataUpload(file, (data) => {
        setJsonData(data);
      });
    }
  };

  const handleSave = () => {
    uploadAgentData(jsonData, page).then((data) => {
      console.log(data.data, data.message);
      setJsonData([]);
      setFile(null);
      toast.success(data.message);
    });
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
    <Paper>
      <Navbar />
        <h1>Dashboard :- {page} </h1>
        <Link to = {`/admin/${page}`}> view all {page} </Link>
      <br />
        <Button onClick={handleDownloadSample}> download sample file</Button>
      <Box
        padding={"10px"}
        display={"flex"}
         width={"90vw"}
        flexDirection={"column"}
        alignItems={"center"}>
        <Box padding={"20px"}>
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
              component="span">
              Choose File
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleConvert}
            disabled={!file}>
            Convert
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            disabled={!file}>
            Save
          </Button>
        </Box>

        <JsonGrid data={jsonData} />
      </Box>
    </Paper>
  );
};

export default AgentUpload;
