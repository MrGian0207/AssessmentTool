import React from "react";
import { Tion, KeyActionsCta } from "../types/assessmentTypes";
import { Stack, Typography } from "@mui/joy";

interface SolutionsType {
  solutions: Tion[],
  keyActionCta: KeyActionsCta
}

function Solutions({ solutions, keyActionCta }: SolutionsType) {
  return (
    <Stack
        spacing={2}
    >
      <Typography
        level="title-lg"
        variant="plain"
        sx={{
            color: "common.white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "24px",
            letterSpacing: "0.02em",
            marginBottom: "20px",
            marginTop: "20px",
            textTransform: "uppercase"
        }}
      >{keyActionCta.text}</Typography>
      {solutions.map((solution, index) => (
        <Stack key={`solution-${index}`} direction="column" gap={2}>
          <Typography
            level="body-sm"
            variant="plain"
            sx={{
                color: "common.white",
                textAlign: "justify",
                opacity: "0.8",
                marginTop: "10px",
                lineHeight: "24px",
                letterSpacing: "0.02em",
            }}
          >{solution.text}</Typography>
          {solution.image_url && (
            <img
              src={solution.image_url}
              alt={`solution-${index}`}
              width="100%"
            />
          )}
        </Stack>
      ))}
      <img 
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "10px",
        marginBottom: "20px",
        marginTop: "20px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)"
      }}
      src={keyActionCta.url} alt="dd" />
    </Stack>
  );
}

export default Solutions;
