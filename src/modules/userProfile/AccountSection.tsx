import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { Heading } from "@/components/typography";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { UserUpdate } from "@/types/type";
import { Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Form } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/button";

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "User name must be at least 2 characters"),

  lastName: Yup.string().min(2, "Last name must be at least 2 characters"),

  displayName: Yup.string().min(
    5,
    "Display name must be at least 2 characters"
  ),
  dateOfBirth: Yup.date().max(
    new Date(),
    "Date of birth cannot be in the future"
  ),
});

const AccountSection = () => {
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  const user = useSelector(selectAuthUser);
  const initialValues: UserUpdate = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    displayName: user?.displayName,
    dateOfBirth: user?.dateOfBirth,
  };

  const handleUpdateProfile = () => {
    setIsUpdateProfile(true);
  };

  const handleCloseUpdateProfile = () => {
    setIsUpdateProfile(false);
  };

  const handleSubmit = async (
    values: UserUpdate,
    { setSubmitting }: FormikHelpers<UserUpdate>
  ) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <section className="w-full">
      <Heading className="text-[30px]">Account Details</Heading>

      <div className="mt-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col w-full gap-8 pb-7">
            <div className="flex flex-col gap-4">
              <Label className="text-[16px] font-semibold" htmlFor="firstName">
                FIRST NAME *
              </Label>
              <Input
                name="firstName"
                className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                placeHolder="First name"
                htmlFor="firstName"
                isDisable={!isUpdateProfile}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label className="text-[16px] font-semibold" htmlFor="lastName">
                LAST NAME *
              </Label>
              <Input
                name="lastName"
                className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                placeHolder="Last name"
                htmlFor="lastName"
                isDisable={!isUpdateProfile}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label
                className="text-[16px] font-semibold"
                htmlFor="displayName"
              >
                DISPLAY NAME *
              </Label>
              <Input
                name="displayName"
                className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                placeHolder="Display name"
                htmlFor="displayName"
                isDisable={!isUpdateProfile}
              />
            </div>

            <span className="italic opacity-50 select-none">
              This will be how your name be displayed in the account section and
              in reviews
            </span>
            <div className="flex flex-col gap-4">
              <Label
                className="text-[16px] font-semibold"
                htmlFor="dateOfBirth"
              >
                DATE OF BIRTH*
              </Label>
              <Input
                type="date"
                name="dateOfBirth"
                className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                placeHolder="Email"
                htmlFor="dateOfBirth"
                isDisable={!isUpdateProfile}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label className="text-[16px] font-semibold" htmlFor="email">
                EMAIL *
              </Label>
              <Input
                name="email"
                className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                placeHolder="Email"
                htmlFor="email"
                isDisable={true}
              />
            </div>
            <div>
              {isUpdateProfile ? (
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    onClick={handleUpdateProfile}
                    className="xl:w-[200px]"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleCloseUpdateProfile}
                    className="opacity-50 xl:w-[200px]"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <Button onClick={handleUpdateProfile} className="xl:w-[300px]">
                  Update Profile
                </Button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AccountSection;
