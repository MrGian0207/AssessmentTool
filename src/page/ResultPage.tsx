import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/joy";
import { Result, Tion } from "../types/assessmentTypes";
import CustomGaugeChart from "../components/CustomGaugeChart";
import Pagination from "@mui/material/Pagination";
import Solutions from "../components/Solutions";
import Share from "../components/ShareTool";
import Box from "@mui/joy/Box";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

interface ResultPageType {
  result: Result;
  score: number;
}

export default function ResultPage({ result, score }: ResultPageType) {
  const navigate = useNavigate();
  useEffect(() => {
    result === null && navigate("/assessment");
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(1);
  const [solutions, setSolutions] = useState<Tion[]>([]);
  const [showShare, setShowShare] = useState(false);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    value === 2 && setSolutions(result.key_actions);
    setPage(value);
  };

  return (
    <React.Fragment>
      <Helmet prioritizeSeoTags>
        <title>{result.name}</title>
        <link rel="canonical" href="https://assessment-tool-iota.vercel.app"/>
        <meta name="description" content="Đánh giá kết quả"></meta>
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Đánh giá" />
        <meta property="og:description" content="Đánh giá kết quả" />
        <meta property="og:url" content="https://assessment-tool-iota.vercel.app"></meta>
        <meta property="og:image" content="https://baomoi-static.bmcdn.me/web/styles/img/facebook-thumb.png" />
        <meta property="og:site_name" content="https://assessment-tool-iota.vercel.app"></meta>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
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
        <Stack
          className="assessment-title"
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          position={"relative"}
          onMouseEnter={() => setShowShare(true)}
          onMouseLeave={() => setShowShare(false)}
        >
          {page === 1 && result ? (
            <React.Fragment>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                sx={{
                  width: "100%",
                }}
              >
                <Stack
                  sx={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    backgroundColor: "common.white",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "primary.plainColor",
                    fontSize: "25px",
                  }}
                >
                  <img src={result.icon} alt="icon result" />
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  height="50px"
                  spacing={1}
                >
                  <Typography
                    level="body-xs"
                    sx={{
                      color: "common.white",
                      textAlign: "center",
                      opacity: "0.6",
                    }}
                  >
                    VOICE OF THE CUSTOMER - CẤP ĐỘ {result.level}
                  </Typography>
                  <Typography
                    level="h4"
                    letterSpacing="1px"
                    sx={{
                      color: "common.white",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    {result.name}
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                level="body-sm"
                sx={{
                  color: "common.white",
                  textAlign: "justify",
                  opacity: "0.6",
                }}
              >
                {result.description.text}
              </Typography>
              <CustomGaugeChart score={score} />
            </React.Fragment>
          ) : result ? (
            <Solutions
              solutions={solutions}
              keyActionCta={result.key_actions_cta}
            />
          ) : null}
          {showShare && (
            <Stack
              sx={{
                position: "absolute",
                right: showShare ? "-25px" : "-73px",
                top: "50%",
                transform: "translateY(-50%)",
                transition: "right 0.3s ease-in-out",
              }}
            >
              <Share />
            </Stack>
          )}
        </Stack>
        {result && (
          <Pagination
            count={2}
            hidePrevButton
            hideNextButton
            page={page}
            onChange={handleChangePage}
            size="small"
            variant="text"
            color="primary"
          />
        )}
      </Box>
    </React.Fragment>
  );
}
