import { useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { Stack } from "@mui/joy";
import { IoRocket } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface IFormInput {
  email: string;
}

function EmailForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  console.log(error);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Kiểm tra liệu email đã nhập vào có tồn tại
      const response = await fetch('http://localhost:5000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json();
      console.log(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An unknown error occurred'));
    }  finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h1 className="description">
        Công ty bạn trưởng <br /> thành như thế nào <br /> trong việc lắng nghe{" "}
        <br /> khách hàng?
      </h1>
      <p className="sub-description">
        Đánh giá khả năng của bạn trong công việc lắng nghe, <br /> hiểu và đáp
        ứng các tín hiệu từ khách hàng.
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
  );
}

export default EmailForm;
