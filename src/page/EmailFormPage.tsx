import React, { useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Stack, Typography  } from "@mui/joy";
import { IoRocket } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { useResult } from "../context/ResultContext";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Assessment } from "../types/assessmentTypes";
import useFetch from "../hooks/useFetch";

const serviceId = "service_hjyqbxi";
const templateId = "template_2fnop6j";
const publicKey = "MxXBxPXvp6L-aUSJL";

// Create a new object that contains dynamic template params

interface IFormInput {
  email: string;
}

function EmailForm() {

  const { data } = useFetch<Assessment>("/assessment.json");

  const navigate = useNavigate();
  const { result } = useResult()!;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    result !== null && navigate("/assessment");

    // eslint-disable-next-line
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    const templateParams = {
      from_name: "Minh Hiếu",
      from_email: data.email,
      to_name: data.email,
      message: "Cảm ơn bạn đã tham gia bài test",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response: EmailJSResponseStatus) => {
        if (response.status === 200) {
          navigate("/assessment");
          toast.success("Xác nhận tham gia thành công");
        }
      })
      .catch((error) => {
        toast.error("Xác nhận tham gia thành công");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.8)",
          textTransform: 'uppercase'
        }}
      >
        {data?.title}
      </Typography>
      <section>
        <h1 className="description">
          Công ty bạn trưởng <br /> thành như thế nào <br /> trong việc lắng
          nghe <br /> khách hàng?
        </h1>
        <p className="sub-description">
          Đánh giá khả năng của bạn trong công việc lắng nghe, <br /> hiểu và
          đáp ứng các tín hiệu từ khách hàng.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input
              {...register("email", {
                required: "Vui lòng điền email của bạn để bắt đầu!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email của bạn không hợp lệ!",
                },
              })}
              name="email"
              style={{ marginTop: "20px", width: "100%" }}
              slotProps={{
                input: {
                  spellCheck: "false",
                },
              }}
              placeholder="Địa chỉ email của bạn"
              size="md"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
            <Button
              loading={isLoading ? true : false}
              type="submit"
              endDecorator={<IoRocket />}
              size="lg"
            >
              Bắt đầu
            </Button>
          </Stack>
        </form>
      </section>
    </React.Fragment>
  );
}

export default EmailForm;
