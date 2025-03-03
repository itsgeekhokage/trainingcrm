/** @format */

import {
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDataByCodes } from "../../apis/agent/getApis";
import { testPostApi } from "../../apis/agent/testApi";
import { toast } from "react-toastify";
import { QueryClient, useMutation } from "@tanstack/react-query";

const TestPlayer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState("");
  const location = useLocation();
  const [noData, setNoData] = useState(false);
  const [user, setUser] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const { project_code, header_code, training_type } =
    location?.state?.link || {};
  const navigate = useNavigate();

  useEffect(() => {
    let data = { project_code, header_code, training_type };
    getDataByCodes({ endpoint: "questions/get", data }).then((res) => {
      let ques = res.data;
      console.log(ques);
      if (ques.length === 0) {
        setNoData(true);
      } else {
        setQuestions(ques);
        setSelectedOptions(new Array(ques.length).fill(null));
      }
    });
    const user = JSON.parse(sessionStorage.getItem("trainingcrm"));
    setUser(user);
    if (!user) {
      window.location.href = "/";
    }
  }, [location.state]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          toast.error("Access to location is denied");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleAnswer = (selectedOption) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = selectedOption;
    setSelectedOptions(updatedSelections);

    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };


  const handleFinish = async () => {
    console.log(JSON.stringify(selectedOptions));
    const correctOptions = questions.map((q) => parseInt(q.answer));
    console.log(JSON.stringify(correctOptions));
    const correctCount = questions.reduce(
      (count, q, idx) =>
        count + (selectedOptions[idx] == parseInt(q.answer) ? 1 : 0),
      0
    );
    const wrongQuestions = questions.filter(
      (q, idx) => selectedOptions[idx] != parseInt(q.answer)
    );
    console.log(wrongQuestions);
    setWrongQuestions(wrongQuestions);

    // const correctCount = questions.reduce(
    //   (count, q, idx) =>
    //     selectedOptions[idx] === q.answer ? count + 1 : count,
    //   0
    // );
    console.log(correctCount);
    const result = correctCount >= questions.length * 0.6 ? true : false;
    console.log(result);
    setVerdict(result);
    setShowResult(true);

    const data = {
      mobile_number: user?.mobile_number,
      project_code,
      header_code,
      training_type,
      result,
      latitude,
      longitude,
      selected_options: JSON.stringify(selectedOptions),
      correct_options: JSON.stringify(correctOptions),
    };
    try {
      await testPostApi("tests", data);
      console.log("Update successful!");
    } catch (err) {
      toast.error("test couldnot be saved");
      console.log(err)
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh">
      {noData ? (
        <Paper
          elevation={3}
          sx={{ p: 4, width: "400px", textAlign: "center" }}>
          <Typography
            variant="h6"
            fontWeight="bold">
            This test currently has no questions.
          </Typography>
          <Typography>Please visit again later.</Typography>
        </Paper>
      ) : !showResult ? (
        questions.length ? (
          <Paper
            elevation={3}
            sx={{ p: 4, width: "400px", textAlign: "center" }}>
            <Typography
              variant="h6"
              fontWeight="bold">
              {questions[currentQuestion].question_text}
            </Typography>
            <RadioGroup>
              {[
                "option_1",
                "option_2",
                "option_3",
                "option_4",
                "option_5",
                "option_6",
                "option_7",
                "option_8",
                "option_9",
                "option_10",
              ].map((optionKey, index) =>
                questions[currentQuestion][optionKey] ? (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        checked={selectedOptions[currentQuestion] === index}
                        onChange={() => handleAnswer(index)}
                      />
                    }
                    label={
                      <Typography sx={{ textAlign: "left" }}>
                        {questions[currentQuestion][optionKey]}
                      </Typography>
                    }
                  />
                ) : null
              )}
            </RadioGroup>

            <Box
              display="flex"
              justifyContent="space-between"
              mt={2}>
              <Button
                variant="contained"
                disabled={currentQuestion === 0}
                onClick={handlePrev}>
                Previous
              </Button>
              <Button
                variant="contained"
                disabled={selectedOptions[currentQuestion] === null}
                onClick={
                  currentQuestion < questions.length - 1
                    ? handleNext
                    : handleFinish
                }>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            </Box>
          </Paper>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <Paper
          elevation={3}
          sx={{ p: 4, width: "400px", textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight="bold">
            Test Results
          </Typography>
          <Typography>Result: {verdict ? "Passes" : "Failed"}</Typography>
          <Box
            mt={2}
            height={"60vh"}
            overflow={"auto"}>
            <Typography fontWeight="bold">Wrong Questions:</Typography>
            {wrongQuestions.map((q, idx) => (
              <Typography key={idx}>{q.question_text}</Typography>
            ))}
            <Button onClick={() => navigate("/agent/h")}>Home</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TestPlayer;
