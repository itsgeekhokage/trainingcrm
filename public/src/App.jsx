/** @format */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import AgentUpload from "./admin/AgentUpload";
import AdminDashboard from "./admin/AdminDashboard";
import { ToastContainer, Bounce } from "react-toastify";
import DataTable from "./admin/components/AllTable";
import AgentDashboard from "./agent/AgentDashboard";
import Home from "./agent/Home";
import VideoPlayer from "./agent/components/VideoPlayer";
import PdfPlayer from "./agent/components/PdfPlayer";
import TestPlayer from "./agent/components/TestPlayer";
import { Box } from "@mui/material";
import AdminHome from "./admin/AdminHome";

function App() {
  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={<AdminDashboard />}>
            <Route
              path="h"
              element={<AdminHome />}
            />
            <Route
              path="agents"
              element={<DataTable />}
            />
            <Route
              path="questions"
              element={<DataTable />}
            />
            <Route
              path="headers"
              element={<DataTable />}
            />
            <Route
              path="upload/agents"
              element={<AgentUpload />}
            />
            <Route
              path="upload/questions"
              element={<AgentUpload />}
            />
            <Route
              path="upload/headers"
              element={<AgentUpload />}
            />

          </Route>
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/agent"
            element={<AgentDashboard />}>
            <Route
              path="h"
              element={<Home />}
            />
            <Route
              path="video-player"
              element={<VideoPlayer />}
            />
            <Route
              path="pdf-player"
              element={<PdfPlayer />}
            />
            <Route
              path="test"
              element={<TestPlayer />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Box>
  );
}

export default App;
