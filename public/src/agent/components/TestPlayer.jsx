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
import { useLocation } from "react-router-dom";
import { getDataByCodes } from "../../apis/agent/getApis";
import { testPostApi } from "../../apis/agent/testApi";

const TestPlayer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState("");
  const location = useLocation();
  const [noData, setNoData] = useState(false);
  const [user, setUser] = useState(null);
  const { project_code, header_code, training_type } =
    location?.state?.link || {};

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

  const handleAnswer = (selectedOption) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = selectedOption;
    setSelectedOptions(updatedSelections);
    console.log(selectedOptions)
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

  const handleFinish = () => {
    console.log(selectedOptions);
    console.log(questions);
    let correctCount = 0
    const tes = questions.map(
      (count, q, idx) =>
        correctCount += (selectedOptions[idx] === q.answer)
    );
    // const correctCount = questions.reduce(
    //   (count, q, idx) =>
    //     selectedOptions[idx] === q.answer ? count + 1 : count,
    //   0
    // );
    console.log(correctCount);
    const result = correctCount >= (questions.length/2) ? true : false;
    console.log(result);
    setVerdict(result);
    setShowResult(true);

    const data = {
      mobile_number: user?.mobile_number,
      project_code,
      header_code,
      training_type,
      result,
    };
    testPostApi("tests", data).then((res) => {
      console.log(res);
    });
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
                        checked={
                          selectedOptions[currentQuestion] ===
                          index
                        }
                        onChange={() =>
                          handleAnswer(index)
                        }
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
        </Paper>
      )}
    </Box>
  );
};

export default TestPlayer;
