import SocialButton from "@/components/button/SocialButton";
import { useAppDispatch } from "@/hooks/hooks";
import { AuthAdminLayout } from "@/layouts";
import { selectAuth } from "@/stores/selectors/authSelector";
import { register, resetAuthStatus } from "@/stores/slices/authSlice";
import { UserRole } from "@/types/Enums";
import { showToast } from "@/utils/toast";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export type FieldSignUpType = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  roles?: UserRole[];
};

const { Paragraph, Title } = Typography;

const SignUpAdminPage = () => {
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectAuth);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleSignUp = async (values: FieldSignUpType) => {
    const signUpForm: FieldSignUpType = {
      ...values,
      roles: [UserRole.Admin, UserRole.Customer],
    };

    try {
      const resultAction = await dispatch(register(signUpForm));
      if (register.fulfilled.match(resultAction)) {
        showToast(
          resultAction.payload.message || "Đăng kí thành công!",
          "success"
        );

        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      } else if (register.rejected.match(resultAction)) {
        showToast(resultAction.payload?.message || "Đăng ký thất bại", "error");
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
        disabled={status === "pending"}
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
            loading={status === "pending"}
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
      <Toaster />
    </AuthAdminLayout>
  );
};

export default SignUpAdminPage;
