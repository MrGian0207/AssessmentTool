import Input from "@mui/joy/Input";
import React, { useState } from "react";
import { Box, Typography } from "@mui/joy";
import { ErrorMessage } from "@hookform/error-message";
import { Stack } from "@mui/joy";
import { useForm, SubmitHandler } from "react-hook-form";
import { useResult } from "../context/ResultContext";
import Button from "@mui/joy/Button";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IFormInput {
  email: string;
}

const serviceId = "service_hjyqbxi";
const templateId = "template_f76sw0x";
const publicKey = "MxXBxPXvp6L-aUSJL";

interface EmailFormShareTypes {
  setShareWithEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

function EmailFormShare({ setShareWithEmail }: EmailFormShareTypes) {
  const { result } = useResult()!;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const templateParams = {
      from_name: "Minh Hiếu",
      from_email: data.email,
      to_name: data.email,
      level: `${result?.level} - ${result?.name}`,
      description: result?.description.text,
      message: result?.key_actions.map(action => action.text).join("\n"),
    };
  

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response: EmailJSResponseStatus) => {
        if (response.status === 200) {
          toast.success("Gửi kết quả đánh giá thành công");
        }
      })
      .catch((error) => {
        toast.success("Gửi kết quả đánh giá thất bại");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
