import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Heading } from "@/components/typography";
import { Form, Formik, FormikHelpers } from "formik";
import { MdOutlineEmail } from "react-icons/md";

import * as Yup from "yup";

interface NewsletterFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const NewsLetter = () => {
  const initialValues: NewsletterFormValues = {
    email: "",
  };
  const handleSubmit = (
    values: NewsletterFormValues,
    { setSubmitting }: FormikHelpers<NewsletterFormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  return (
    <section className="relative mt-16">
      <img
        src="/public/newsletter.png"
        alt=""
        className="w-full h-[400px] md:h-[500px] object-cover"
      />
      <div className="absolute z-10 w-full text-center -translate-x-1/2 -translate-y-1/2 px-14 top-1/2 left-1/2">
        <div className="flex flex-col gap-5 mb-6">
          <Heading className="text-[30px] md:text-[40px] xl:text-[55px]">
            Join Our Newsletter
          </Heading>
          <span className="text-sm text-gray-500 md:text-lg">
            Sign up for deals, new products and promotions
          </span>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col items-center ">
              <Input
                name="email"
                className=" md:text-lg md:placeholder:text-base"
                width={"w-full md:w-[60%] lg:w-[40%] xl:w-[30%]"}
                placeholder="Email address"
                icon={<MdOutlineEmail className="text-3xl text-gray-500" />}
              />
              <Button
                className="mt-5 w-full md:w-[60%] lg:w-[40%] xl:w-[30%]"
                size="lg"
              >
                Sign Up
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
