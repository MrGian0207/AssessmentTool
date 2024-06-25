import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import InstructionScreen from "../components/Instruction";
import QuestionsScreen from "../components/Questions";
import { Typography  } from "@mui/joy";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import { Assessment as AssessmentType } from "../types/assessmentTypes";
import useFetch from "../hooks/useFetch";

function Assessment() {
  const { data } = useFetch<AssessmentType>("/assessment.json");

  const { result, setScore, setResult } = useResult()!;
  const navigate = useNavigate();
  const [startAssessment, setStartAssessment] = useState<boolean>(false);

  useEffect(() => {
    if (result !== null) {
      setStartAssessment(true);
      localStorage.setItem("StartAssessment", "true");
      navigate("/result");
    }
  }, [result, navigate]);

  return (
    <React.Fragment>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.8)",
          textTransform: "uppercase",
        }}
      >
        {data?.title}
      </Typography>
      <Box
        component="section"
        sx={{
          borderRadius: "5px",
          display: "flex",
          height: "fit-content",
          width: "400px",
          padding: "30px",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          color: "rgb(255, 255, 255)",
        }}
      >
        {startAssessment ? (
          <QuestionsScreen setResult={setResult} setScore={setScore} />
        ) : (
          <InstructionScreen setStartAssessment={setStartAssessment} />
        )}
      </Box>
    </React.Fragment>
  );
}

export default Assessment;
