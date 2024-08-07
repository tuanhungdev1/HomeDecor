import { Input } from "@/components/input";
import { AuthLayout } from "@/layouts";
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface SignUpFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name cannot contain numbers")
    .min(5, "Name must be at least 5 characters")
    .required("Name is required"),
  username: Yup.string()
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
  const initialValues: SignUpFormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  };
  const handleSubmit = (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  return (
    <AuthLayout title="Sign up">
      <span className="text-lg text-neutral-4">
        Already have an account?{" "}
        <Link
          className="font-semibold text-secondary-green"
          to={"/auth/sign-in"}
        >
          Sign In
        </Link>
      </span>

      <div className="flex flex-col gap-8 mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-8">
            <Input name="name" placeHolder="Your name" />
            <Input name="username" placeHolder="Username" />
            <Input type="email" name="email" placeHolder="Email address" />
            <Input type="password" name="password" placeHolder="Password" />
          </Form>
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
