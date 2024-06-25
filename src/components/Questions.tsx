import React, { useState, useEffect } from "react";
import axios from "axios";
import { Assessment, Question, Result } from "../types/assessmentTypes";
import { Stack, Typography } from "@mui/joy";
import { IoArrowForwardSharp, IoArrowBackSharp } from "react-icons/io5";
import { calculateScore, getMaturityLevel } from "../utils/calculateScore";
import Button from "@mui/joy/Button";

interface QuestionsScreenType {
  setResult: React.Dispatch<React.SetStateAction<Result | null>>;
  setScore:  React.Dispatch<React.SetStateAction<number>>;
}

function QuestionsScreen({ setResult, setScore }: QuestionsScreenType) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [resultOfQuestions, setResultOfQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchAssessment = async () => {
      try {
        const response = await axios.get<Assessment>("/assessment.json");
        const data = response.data;
        setQuestions(data.questions);
        setResults(data.results);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssessment();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    }

    if (currentQuestionIndex === (questions?.length || 0) - 1) {
      const totalScore = calculateScore(resultOfQuestions);
      const result: Result = getMaturityLevel(totalScore, results);
      setScore(totalScore);
      setResult(result as Result);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Reset selected option for the previous question
    }
  };

  const handleSelectAnswer = (question: Question, optionId: number) => {
    setSelectedOption(optionId);
    const updatedQuestions = [...resultOfQuestions];
    updatedQuestions[currentQuestionIndex] = {
      ...question,
      options: question.options.filter((option) => option.id === optionId),
    };
    setResultOfQuestions(updatedQuestions);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <React.Fragment>
      {/* Current Question */}
      <Stack
        className="assessment-title"
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          sx={{
            height: "8px",
            width: "8px",
            borderRadius: "50%",
            backgroundColor: "primary.plainColor",
          }}
        ></Typography>
        <Typography
          level="body-md"
          sx={{ color: "common.white", opacity: "0.6" }}
        >
          CÂU HỎI {currentQuestionIndex + 1}/10
        </Typography>
      </Stack>
      {/* End Current Question */}

      {/* Question */}
      <Stack
        className="assessment-content"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        marginTop="30px"
      >
        {/* Title Of Question */}
        <Typography
          level="title-lg"
          sx={{ color: "common.white", textAlign: "center" }}
        >
          {questions[currentQuestionIndex].title}
        </Typography>
        {/* End Title Of Question */}

        {/* Options For Answer Question */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          spacing={3}
        >
          {questions[currentQuestionIndex].options.map((option) => {
            const isActive =
              selectedOption === option.id ||
              resultOfQuestions[currentQuestionIndex]?.options?.includes(
                option
              );
            return (
              <Button
                onClick={() => {
                  const questionWithAnswer: Question = {
                    ...questions[currentQuestionIndex],
                    options: [option],
                  };
                  handleSelectAnswer(questionWithAnswer, option.id);
                }}
                key={option.id}
                size="lg"
                fullWidth
                sx={{
                  borderWidth: "2px",
                  borderColor: isActive ? "primary.plainColor" : "common.white",
                  borderStyle: "solid",
                  color: isActive ? "primary.plainColor" : "common.white",
                  backgroundColor: "transparent",
                  "&:hover": {
                    borderColor: "primary.plainColor",
                    color: "primary.plainColor",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {option.text}
              </Button>
            );
          })}
        </Stack>
        {/* End Options For Answer Question */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          spacing={8}
        >
          <Button
            onClick={handlePreviousQuestion}
            fullWidth
            size="lg"
            startDecorator={<IoArrowBackSharp />}
            sx={{
              backgroundColor: "common.white",
              color: "primary.plainColor",
              "&:hover": {
                backgroundColor: "primary.plainColor",
                color: "common.white",
              },
            }}
          >
            Quay lại
          </Button>
          <Button
            onClick={handleNextQuestion}
            fullWidth
            size="lg"
            endDecorator={<IoArrowForwardSharp />}
            sx={{
              backgroundColor: "primary.plainColor",
              color: "common.white",
              "&:hover": {
                backgroundColor: "common.white",
                color: "primary.plainColor",
              },
            }}
          >
            {currentQuestionIndex === questions.length - 1
              ? "Hoàn thành"
              : "Tiếp theo"}
          </Button>
        </Stack>
      </Stack>
      {/* End Question */}
    </React.Fragment>
  );
}

export default QuestionsScreen;
