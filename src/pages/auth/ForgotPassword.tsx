import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/hooks/useAuth";
import { AuthLayout } from "@/layouts";
import { ForgotPasswordFormValues } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  const { status, error, handleReset, handleForgotPassword } = useAuth();

  const navigate = useNavigate();

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
    await handleForgotPassword(values);
    setSubmitting(false);
  };

  useEffect(() => {
    let loadingToastId: string | undefined;

    if (status === "pending") {
      loadingToastId = toast.loading("Changing your password...");
    } else if (status === "succeeded") {
      toast.dismiss(loadingToastId);
      toast.success("Your password has been successfully changed!");
      const timer = setTimeout(() => {
        handleReset();
        navigate("/auth/sign-in");
      }, 2000);

      return () => {
        toast.remove();
        clearTimeout(timer);
      };
    } else if (status === "rejected" && error) {
      toast.dismiss(loadingToastId);
      toast.error(error);
    }

    return () => {
      toast.remove();
    };
  }, [status, error, navigate, handleReset]);

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
              isLoading={status === "pending"}
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
