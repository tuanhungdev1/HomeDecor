import SocialButton from "@/components/button/SocialButton";
import { AuthAdminLayout } from "@/layouts";

import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export type FieldLoginType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [form] = Form.useForm();

  const handleLogin = (values: FieldLoginType) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  return (
    <AuthAdminLayout image="/public/admin-login-page.jpg">
      <Typography className="text-center">
        <Title level={2}>Log in to your account</Title>
        <Paragraph className="text-gray-500">
          Welcome back! Please enter your details.
        </Paragraph>
      </Typography>
      <Form
        name="admin-login-form"
        form={form}
        disabled={isLoading}
        layout="vertical"
        onFinish={handleLogin}
        size="large"
        autoComplete="off"
      >
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
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name={"remember"} valuePropName="checked" noStyle>
              <Checkbox
                value={isRemember}
                onChange={() => setIsRemember(!isRemember)}
              >
                Remember me
              </Checkbox>
            </Form.Item>
            <Link to="/admin/forgot-password">Forgot password</Link>
          </Flex>
        </Form.Item>

        <div>
          <Button
            onClick={() => form.submit()}
            type="primary"
            className="w-full"
            size="large"
            loading={isLoading}
          >
            Login
          </Button>
        </div>
        <div className="mt-4">
          <SocialButton
            title="Login with Google"
            urlIcon="/public/google.png"
          ></SocialButton>
        </div>

        <Flex justify="center" className="mt-6" gap={6}>
          <p className="text-gray-400">Don't have an account?</p>
          <Link to={"/admin/sign-up"} className="font-medium text-blue-500 ">
            Sign up
          </Link>
        </Flex>
      </Form>
    </AuthAdminLayout>
  );
};

export default LoginAdminPage;
