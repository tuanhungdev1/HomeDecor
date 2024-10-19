import SocialButton from "@/components/button/SocialButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AuthAdminLayout } from "@/layouts";
import { selectAuth } from "@/stores/selectors/authSelector";
import { loginAdmin, resetAuthStatus } from "@/stores/slices/authSlice";
import { getRedirectFromUrl } from "@/utils/getRedirectFromUrl";
import { showToast } from "@/utils/toast";

import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export type FieldLoginType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginAdminPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();

  const handleLogin = async (values: FieldLoginType) => {
    try {
      const resultAction = await dispatch(loginAdmin(values));
      if (loginAdmin.fulfilled.match(resultAction)) {
        showToast(
          resultAction.payload.message || "ADMIN đăng nhập thành công!",
          "success"
        );

        setTimeout(() => {
          navigate(getRedirectFromUrl(location.search));
        }, 2000);
      } else if (loginAdmin.rejected.match(resultAction)) {
        showToast(
          resultAction.payload?.message || "Đăng nhập thất bại",
          "error"
        );
      }
    } catch (err) {
      showToast("Có lỗi xảy ra khi đăng kí", "error");
    } finally {
      dispatch(resetAuthStatus());
    }
  };

  useEffect(() => {
    return () => {
      toast.remove();
    };
  }, []);

  return (
    <AuthAdminLayout image="/public/admin-login-page.jpg">
      <Toaster />
      <Typography className="text-center">
        <Title level={2}>Log in to your account</Title>
        <Paragraph className="text-gray-500">
          Welcome back! Please enter your details.
        </Paragraph>
      </Typography>
      <Form
        name="admin-login-form"
        form={form}
        disabled={status === "pending"}
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
              <Checkbox>Remember me</Checkbox>
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
            loading={status === "pending"}
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
