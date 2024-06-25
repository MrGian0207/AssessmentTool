import React, { useState } from "react";
import { Box, Typography } from "@mui/joy";
import Input from "@mui/joy/Input";
import { ErrorMessage } from "@hookform/error-message";
import { Stack } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/joy/Button";

interface IFormInput {
  email: string;
}

interface EmailFormShareTypes {
  setShareWithEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

function EmailFormShare({ setShareWithEmail }: EmailFormShareTypes) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  console.log(error);

  const handleEnterEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của Enter (nếu có)
      handleSubmit(onSubmit)(); // Gọi handleSubmit để submit form
    }
  };

  const handleBack = () => {
    setShareWithEmail(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Kiểm tra liệu email đã nhập vào có tồn tại
      const response = await fetch("http://localhost:5000/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });

  return (
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
          Chia sẻ qua email
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
          Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả:
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack spacing={2}>
            <Input
              {...register("email", {
                required: "Vui lòng điền email của bạn để bắt đầu!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email của bạn không hợp lệ!",
                },
              })}
              name="email"
              onKeyDown={handleEnterEmail}
              style={{ marginTop: "20px", width: "100%" }}
              slotProps={{
                input: {
                  spellCheck: "false",
                },
              }}
              placeholder="Địa chỉ email nhận kết quả"
              size="md"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type} style={{ color: "#000000" }}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                marginTop: "20px",
                width: "100%",
              }}
            >
              <Button
                onClick={handleBack}
                fullWidth
                variant="soft"
                size="lg"
                sx={{
                  color: "primary.plainColor",
                }}
              >
                Quay lại
              </Button>
              <Button
                fullWidth
                loading={isLoading ? true : false}
                type="submit"
                size="lg"
              >
                Gửi Email
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
}

export default EmailFormShare;
