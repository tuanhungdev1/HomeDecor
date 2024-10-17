import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { AuthLayout } from "@/layouts";
import { LoginData } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
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
  const { status, error, handleLogin, handleReset } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    const params = new URLSearchParams(location.search);

    const redirectUrl = params.get("redirect") || "/";
    navigate(redirectUrl);
  };

  const initialValues: LoginData = {
    username: "",
    password: "",
    rememberPassword: false,
  };

  const handleSubmit = async (
    values: LoginData,
    { setSubmitting }: FormikHelpers<LoginData>
  ) => {
    let toastId;

    try {
      toastId = toast.loading("Logging in. Please wait...");

      await handleLogin(values);

      toast.dismiss(toastId);
      toast.success("Logged in successfully!");

      handleReset();
      handleSuccessfulLogin();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

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
          <Form className="flex flex-col w-full xl:w-[500px] 2xl:w-[600px] gap-4 pb-7">
            <Input name="username" placeholder="Username or Email" />
            <Input type="password" name="password" placeholder="Password" />
            <div className="relative flex items-center justify-between">
              <Checkbox
                name="rememberPassword"
                className="flex-1 mt-3"
                label={<Label>Remember me</Label>}
              />
              <Link to={"/auth/forgot-password"}>
                <Label className="absolute right-0 flex-1 text-sm font-medium text-black -translate-y-[3px] top-1/2 text-end">
                  Forgot password?
                </Label>
              </Link>
            </div>

            <Button
              type="submit"
              className="mt-3"
              size="lg"
              isLoading={status === "pending"}
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
