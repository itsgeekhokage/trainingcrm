/** @format */

import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeadersList from "./components/HeadersList";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const [activeButtons, setActiveButtons] = useState({
    online: false,
    offline: false,
    ac_pc: false,
    quality: false,
  });
  const [project_code, set_project_code] = useState("");
  const [training_type, set_training_type] = useState("");
  const navigate = useNavigate();

  const [agent, setAgent] = useState({});

  const handleSelection = (type) => {
    set_training_type(type);
    navigate(`${project_code}/${type}`);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("trainingcrm"));
    set_project_code(user.project_code);
    setActiveButtons({
      online: user.training_type_online,
      offline: user.training_type_offline,
      ac_pc: user.training_type_ac_pc,
      quality: user.training_type_quality,
    });
  }, []);
  
  return (
    <Box
      flex={1}
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center">
      <Typography
        variant="h5"
        gutterBottom>
        Project :- {project_code}
      </Typography>
      <Box
        display="flex" flexWrap={"wrap"} margin={2}
        gap={2}>
        {Object.entries(activeButtons).map(([key, isActive]) => (
          <Button
            key={key}
            variant={isActive ? "contained" : "outlined"}
            color={isActive ? "warning" : "grey"}
            onClick={
              isActive
                ? () => handleSelection(key)
                : () => set_training_type("na")
            }>
            {key.replace("_", " ").toUpperCase()}
          </Button>
        ))}
      </Box>
      {training_type == "na" ? (
        <p >Access denied!!</p>
      ) : training_type == "" ? (
        <p> Please select an option to continue...</p>
      ) : (
        <Outlet/>
      )}
    </Box>
  );
};

export default Home;
