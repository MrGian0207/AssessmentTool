import React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import Button from "@mui/joy/Button";
import { Stack, Typography } from "@mui/joy";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useResult } from "../context/ResultContext";

interface InstructionScreenTypes {
  setStartAssessment: React.Dispatch<React.SetStateAction<boolean>>;
}

function InstructionScreen({ setStartAssessment }: InstructionScreenTypes) {
  const { instruction } = useResult()!;

  const handleStartAssessment = () => {
    localStorage.setItem("StartAssessment", "true");
    setStartAssessment(true);
  };

  return (
    <React.Fragment>
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
          Hướng dẫn trả lời
        </Typography>
      </Stack>

      <Stack
        className="assessment-content"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        marginTop="30px"
      >
        {/* Intruction */}
        <Typography level="title-lg" sx={{ color: "common.white" }}>
          {instruction?.title}
        </Typography>
        <List marker="disc">
          {instruction?.descriptions.map((description) => {
            return (
              <ListItem key={description?.id}>
                <ListItemContent>
                  <Typography
                    level="body-md"
                    sx={{
                      color: "common.white",
                      opacity: "0.8",
                      textAlign: "justify",
                    }}
                  >
                    {description?.text}
                  </Typography>
                </ListItemContent>
              </ListItem>
            );
          })}
        </List>
        <Button
          onClick={handleStartAssessment}
          size="lg"
          fullWidth
          endDecorator={<IoArrowForwardSharp />}
        >
          Bắt đầu
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export default InstructionScreen;
