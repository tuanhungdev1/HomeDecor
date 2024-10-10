import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAppDispatch } from "@/hooks/hooks";
import { AuthLayout } from "@/layouts";
import {
  selectAuthError,
  selectAuthStatus,
} from "@/stores/selectors/authSelector";
import { changePassword, resetAuthStatus } from "@/stores/slices/authSlice";

import { ForgotPasswordFormValues } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Old password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New password must be different from the old password"
    )
    .required("New password is required"),
});

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const authStatus = useSelector(selectAuthStatus);

  const authError = useSelector(selectAuthError);

  const initialValues: ForgotPasswordFormValues = {
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  };

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    await dispatch(changePassword(values)).unwrap();
    setSubmitting(false);
  };

  useEffect(() => {
    if (authStatus === "succeeded") {
      toast.success("Your password has been successfully changed!");
      const timer = setTimeout(() => {
        dispatch(resetAuthStatus());
        navigate("/auth/sign-in");
      }, 2000);

      // Clean up timer on component unmount or if authStatus changes
      return () => {
        toast.remove();
        clearTimeout(timer);
      };
    } else if (authStatus === "rejected" && authError) {
      toast.error(authError);
    }
    return () => {
      toast.remove();
    };
  }, [authStatus, authError, navigate, dispatch]);

  return (
    <AuthLayout title="Reset Password">
      <span className="text-base text-neutral-4 xl:text-lg">
        Remember your password?{" "}
        <Link
          className="font-semibold text-secondary-green"
          to={"/auth/sign-in"}
        >
          Sign In
        </Link>
      </span>

      <div className="flex flex-col mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col w-full xl:w-[500px] 2xl:w-[600px] gap-4 pb-7">
            <p className="text-sm text-neutral-4">
              Please fill in the following information to reset your password.
            </p>
            <Input name="username" placeholder="Username" />
            <Input name="email" placeholder="Email address" type="email" />
            <Input
              name="currentPassword"
              placeholder="Old Password"
              type="password"
            />
            <Input
              name="newPassword"
              placeholder="New Password"
              type="password"
            />

            <Button
              type="submit"
              size="lg"
              className="mt-3"
              isLoading={authStatus === "pending"}
            >
              Reset Password
            </Button>
          </Form>
        </Formik>
        <Toaster />
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
