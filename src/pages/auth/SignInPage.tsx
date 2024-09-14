import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { AuthLayout } from "@/layouts";
import {
  login,
  resetAuthStatus,
  selectAuthError,
  selectAuthStatus,
} from "@/stores/authSlice/authSlice";
import { AppDispatch } from "@/stores/store";
import { LoginData } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberPassword: Yup.boolean(),
});

const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authError = useSelector(selectAuthError);

  const authStatus = useSelector(selectAuthStatus);

  const navigate = useNavigate();

  const initialValues: LoginData = {
    username: "",
    password: "",
    rememberPassword: false,
  };

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting }: FormikHelpers<LoginData>
  ) => {
    await dispatch(login(values)).unwrap(); // unwrap() để lấy giá trị kết quả hoặc lỗi từ thunk
    setSubmitting(false);
  };

  useEffect(() => {
    if (authStatus === "succeeded") {
      toast.success("Logged in successfully!");
      const timer = setTimeout(() => {
        dispatch(resetAuthStatus());
        navigate("/");
      }, 2000);

      // Clean up timer on component unmount or if authStatus changes
      return () => clearTimeout(timer);
    } else if (authStatus === "rejected" && authError) {
      toast.error(authError);
    }

    return () => {
      toast.remove();
    };
  }, [authStatus, authError, navigate, dispatch]);

  return (
    <AuthLayout title="Sign In">
      <span className="text-base text-neutral-4 xl:text-lg">
        Don't have an account?{" "}
        <Link
          className="font-semibold text-secondary-green"
          to={"/auth/sign-up"}
        >
          Sign Up
        </Link>
      </span>

      <div className="flex flex-col mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col w-full xl:w-[500px] 2xl:w-[600px]  gap-8 pb-7">
            <Input name="username" placeHolder="Username or Email" />
            <Input type="password" name="password" placeHolder="Password" />
            <div className="relative flex items-center justify-between">
              <Checkbox
                name="rememberPassword"
                className="flex-1 mt-3"
                label={<Label>Remember me</Label>}
              ></Checkbox>

              <Link to={"/auth/forgot-password"}>
                <Label className="absolute right-0 flex-1 text-sm font-medium text-black -translate-y-[3px] top-1/2 text-end">
                  Forgot password?
                </Label>
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-3"
              isLoading={authStatus === "pending"}
            >
              Sign In
            </Button>
          </Form>
        </Formik>
        <Toaster />
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
