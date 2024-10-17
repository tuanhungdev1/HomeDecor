import SocialButton from "@/components/button/SocialButton";
import { AuthAdminLayout } from "@/layouts";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export type FieldSignUpType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
};

const { Paragraph, Title } = Typography;

const SignUpAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSignUp = (values: FieldSignUpType) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  return (
    <AuthAdminLayout image="/public/sign-up-admin.jpg">
      <Typography className="text-center">
        <Title level={2}>Create ac account</Title>
        <Paragraph className="text-gray-500">
          Start your 30-day free trial
        </Paragraph>
      </Typography>
      <Form
        name="admin-sign-up-form"
        form={form}
        disabled={isLoading}
        layout="vertical"
        onFinish={handleSignUp}
        size="large"
        autoComplete="off"
      >
        <Form.Item
          hasFeedback
          name={"firstname"}
          label="Firstname"
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập firstname",
            },
            {
              min: 3,
              message: "Fistname phải lơn hơn 3 kí tự",
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Firstname chỉ được chứa chữ cái",
            },
          ]}
        >
          <Input allowClear maxLength={100} placeholder="Enter your Fistname" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name={"lastname"}
          label="Lastname"
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lastname",
            },
            {
              min: 3,
              message: "Lastname phải lơn hơn 3 kí tự",
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Firstname chỉ được chứa chữ cái",
            },
          ]}
        >
          <Input allowClear maxLength={100} placeholder="Enter your Lasename" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name={"username"}
          label="Username"
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập  Username",
            },
            {
              min: 3,
              message: "Username phải lơn hơn 3 kí tự",
            },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Username chỉ được chứa chữ cái, số và dấu gạch dưới",
            },
          ]}
        >
          <Input allowClear maxLength={100} placeholder="Enter your Username" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name={"email"}
          label="Email"
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input allowClear maxLength={100} placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name={"password"}
          label="Password"
          validateDebounce={1000}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt",
            },
            {
              min: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          ]}
        >
          <Input.Password allowClear placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear placeholder="Confirm your password" />
        </Form.Item>

        <div>
          <Button
            onClick={() => form.submit()}
            type="primary"
            className="w-full"
            size="large"
            loading={isLoading}
          >
            Get started
          </Button>
        </div>
        <div className="mt-4">
          <SocialButton
            title="Sign up with Google"
            urlIcon="/public/google.png"
          ></SocialButton>
        </div>

        <Flex justify="center" className="mt-6" gap={6}>
          <p className="text-gray-400">Already have an account?</p>
          <Link to={"/admin/login"} className="font-medium text-blue-500 ">
            Log in
          </Link>
        </Flex>
      </Form>
    </AuthAdminLayout>
  );
};

export default SignUpAdminPage;
