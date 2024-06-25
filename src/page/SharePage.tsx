import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/joy";
import { Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import EmailFormShare from "../components/EmailFormShare";
import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import { useResult } from "../context/ResultContext";

function SharePage() {
  const navigate = useNavigate();
  const { result } = useResult()!;

  useEffect(() => {
    result === null && navigate("/assessment");

    // eslint-disable-next-line
  }, []);

  const [shareWithEmail, setShareWithEmail] = useState<boolean>(false);

  const shareUrl = "https://assessment-tool-iota.vercel.app/result" || "";

  const handleShareWithEmail = () => {
    setShareWithEmail(true);
  };

  const handleCancelShare = () => {
    navigate("/result");
  };

  const handleSaveResultUrl = () => {
    navigator.clipboard.writeText(
      "https://assessment-tool-iota.vercel.app/result"
    );
  };

  return !shareWithEmail ? (
    <React.Fragment>
      <Box
        component="section"
        sx={{
          borderRadius: "5px",
          display: "flex",
          height: "fit-content",
          width: "300px",
          padding: "20px",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "rgb(255, 255, 255)",
        }}
      >
        <Typography level="h4" fontWeight={600}>
          Chia sẻ kết quả
        </Typography>

        <Typography
          level="body-sm"
          fontWeight={500}
          marginTop={3}
          sx={{
            width: "100%",
            color: "rgba(0, 0, 0, 0.8)",
          }}
        >
          Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của
          mình
        </Typography>

        <Stack width={"100%"} direction="column" spacing={2} marginTop={3}>
          <FacebookShareButton
            url={shareUrl}
            style={{
              width: "100%",
              backgroundColor: "#0b6bcb",
              padding: "6px 16px",
              height: "36px",
              borderRadius: "6px",
            }}
          >
            Chia sẻ qua Facebook
          </FacebookShareButton>
          <Button
            fullWidth
            variant="soft"
            sx={{ color: "primary.plainColor" }}
            onClick={handleShareWithEmail}
          >
            Chia sẻ qua Gmail
          </Button>
          <Button
            onClick={handleSaveResultUrl}
            fullWidth
            variant="soft"
            sx={{ color: "primary.plainColor" }}
          >
            Sao chép đường dẫn đến trang kết quả
          </Button>
          <Button
            onClick={handleCancelShare}
            fullWidth
            variant="plain"
            sx={{ color: "primary.plainColor" }}
          >
            Hủy
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  ) : (
    <EmailFormShare setShareWithEmail={setShareWithEmail} />
  );
}

export default SharePage;
