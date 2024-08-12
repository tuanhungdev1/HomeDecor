import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { AuthLayout } from "@/layouts";
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface ForgotPasswordFormValues {
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  oldPassword: Yup.string()
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
  const initialValues: ForgotPasswordFormValues = {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  };

  const handleSubmit = (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    setTimeout(() => {
      alert("Password reset request submitted for: " + values.username);
      setSubmitting(false);
    }, 400);
  };

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
          <Form className="flex flex-col w-full xl:w-[500px] 2xl:w-[600px] gap-8 pb-7">
            <p className="text-sm text-neutral-4">
              Please fill in the following information to reset your password.
            </p>
            <Input name="username" placeHolder="Username" />
            <Input name="email" placeHolder="Email address" type="email" />
            <Input
              name="oldPassword"
              placeHolder="Old Password"
              type="password"
            />
            <Input
              name="newPassword"
              placeHolder="New Password"
              type="password"
            />

            <Button type="submit" className="mt-3">
              Reset Password
            </Button>
          </Form>
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
