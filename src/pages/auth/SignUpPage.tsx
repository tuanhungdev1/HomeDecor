import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { useAppDispatch } from "@/hooks/hooks";
import { AuthLayout } from "@/layouts";
import {
  selectAuthError,
  selectAuthStatus,
} from "@/stores/selectors/authSelector";
import { resetAuthStatus } from "@/stores/slices/authSlice";
import { register } from "@/stores/thunks/authThunk";

import { UserRole } from "@/types/Enums";
import { RegisterData } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  displayName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name cannot contain numbers")
    .min(5, "Name must be at least 5 characters")
    .required("Name is required"),
  userName: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  agreeTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);

  const authError = useSelector(selectAuthError);

  const initialValues: RegisterData = {
    displayName: "",
    userName: "",
    email: "",
    password: "",
    roles: [UserRole.Customer],
    agreeTerms: false,
  };
  const handleSubmit = async (
    values: RegisterData,
    { setSubmitting }: FormikHelpers<RegisterData>
  ) => {
    await dispatch(register(values)).unwrap();
    setSubmitting(false);
  };

  useEffect(() => {
    if (authStatus === "succeeded") {
      toast.success("Create user in successfully!");
      const timer = setTimeout(() => {
        dispatch(resetAuthStatus());
        navigate("/auth/sign-in");
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

  console.log(authStatus, authError);

  return (
    <AuthLayout title="Sign up">
      <span className="text-base text-neutral-4 xl:text-lg">
        Already have an account?{" "}
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
          <Form className="flex flex-col w-full xl:w-[500px] 2xl:w-[600px]  gap-4 pb-7">
            <Input name="displayName" placeholder="Your name" />
            <Input name="userName" placeholder="Username" />
            <Input type="email" name="email" placeholder="Email address" />
            <Input type="password" name="password" placeholder="Password" />
            <Checkbox
              name="agreeTerms"
              className="mt-3 text-sm"
              label={
                <Label>
                  I agree with{" "}
                  <span className="font-semibold text-primary">
                    Privacy Policy{" "}
                  </span>
                  and{" "}
                  <span className="font-semibold text-primary">
                    Terms of Use
                  </span>
                </Label>
              }
            ></Checkbox>

            <Button
              type="submit"
              size="lg"
              className="mt-3"
              isLoading={authStatus === "pending"}
            >
              Sign Up
            </Button>
          </Form>
        </Formik>
        <Toaster />
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
