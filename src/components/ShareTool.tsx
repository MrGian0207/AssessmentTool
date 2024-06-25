import { Stack, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { LuDownload, LuRotateCcw, LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useResult } from "../context/ResultContext";

function Share() {
  const { setScore, setResult } = useResult()!;
  const navigate = useNavigate();

  const handleReset = () => {
    setScore(0);
    setResult(null);
    navigate("/assessment");
  };

  return (
    <Stack direction={"column"} spacing={1} sx={{ width: "48px" }}>
      <Button
        variant="plain"
        sx={{
          height: "120px",
          backgroundColor: "#2196f3",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#1976d2",
          },
        }}
      >
        <Link to={"/share"} style={{ textDecoration: "none" }}>
          <Stack
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", paddingTop: "20px" }}
          >
            <Typography
              level="body-md"
              sx={{
                color: "white",
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              Chia sẻ
            </Typography>
            <LuExternalLink color="white" size={24} />
          </Stack>
        </Link>
      </Button>
      <Button
        variant="solid"
        sx={{
          height: "48px",
          borderRadius: "8px",
          backgroundColor: "common.white",
          color: "primary.plainColor",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
        }}
      >
        <LuDownload size={24} />
      </Button>
      <Button
        onClick={handleReset}
        variant="solid"
        sx={{
          height: "48px",
          borderRadius: "8px",
          backgroundColor: "common.white",
          color: "primary.plainColor",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
        }}
      >
        <LuRotateCcw size={24} />
      </Button>
    </Stack>
  );
}

export default Share;
