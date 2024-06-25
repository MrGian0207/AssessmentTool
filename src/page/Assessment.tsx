import { useEffect } from "react";
import Box from "@mui/joy/Box";
import QuestionsScreen from "../components/Questions";
import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const { result, setScore, setResult } = useResult()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (result !== null) {
      navigate("/result");
    }
  }, [result, navigate]);

  return (
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
      {result === null && (
        <QuestionsScreen setResult={setResult} setScore={setScore} />
      )}
    </Box>
  );
}

export default Assessment;
