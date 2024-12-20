import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { Heading } from "@/components/typography";
import { UserUpdate } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "@/components/button";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "User name must be at least 2 characters"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters"),
  displayName: Yup.string().min(
    5,
    "Display name must be at least 5 characters"
  ),
  dateOfBirth: Yup.date().max(
    new Date(),
    "Date of birth cannot be in the future"
  ),
});

const AccountSection = () => {
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, handleUpdateUserInfo, handleGetUserInfo } = useAuth();

  const initialValues: UserUpdate = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    displayName: user?.displayName || "",
    dateOfBirth: user?.dateOfBirth || "",
  };

  const handleSubmit = async (
    values: UserUpdate,
    { setSubmitting }: FormikHelpers<UserUpdate>
  ) => {
    setIsSubmitting(true);
    try {
      if (user && values) {
        await handleUpdateUserInfo(user.id, values);
        await handleGetUserInfo();
        toast.success("User information updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update user information");
    } finally {
      setIsSubmitting(false);
      setIsUpdateProfile(false);
      setSubmitting(false);
    }
  };

  const handleClose = (resetForm: () => void) => {
    resetForm();
    setIsUpdateProfile(false);
  };

  const handleUpdateProfile = () => {
    setIsUpdateProfile(true);
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
          {({ handleChange, handleBlur, resetForm, values }) => (
            <Form className="flex flex-col w-full gap-8 pb-7">
              <div className="flex flex-col gap-4">
                <Label
                  className="text-[16px] font-semibold"
                  htmlFor="firstName"
                >
                  FIRST NAME *
                </Label>
                <Input
                  name="firstName"
                  className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                  placeholder="First name"
                  id="firstName"
                  disabled={!isUpdateProfile}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-[16px] font-semibold" htmlFor="lastName">
                  LAST NAME *
                </Label>
                <Input
                  name="lastName"
                  className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                  placeholder="Last name"
                  id="lastName"
                  disabled={!isUpdateProfile}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  placeholder="Display name"
                  id="displayName"
                  disabled={!isUpdateProfile}
                  value={values.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <span className="italic opacity-50 select-none">
                This will be how your name be displayed in the account section
                and in reviews
              </span>
              <div className="flex flex-col gap-4">
                <Label
                  className="text-[16px] font-semibold"
                  htmlFor="dateOfBirth"
                >
                  DATE OF BIRTH *
                </Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                  placeholder="Date of Birth"
                  id="dateOfBirth"
                  disabled={!isUpdateProfile}
                  value={values.dateOfBirth?.split("T")[0]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-[16px] font-semibold" htmlFor="email">
                  EMAIL *
                </Label>
                <Input
                  name="email"
                  className="border-[2px] border-b-[2px] rounded-md px-3 py-3"
                  placeholder="Email"
                  id="email"
                  disabled={true}
                  value={user?.email}
                />
              </div>
              <div>
                {isUpdateProfile ? (
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="xl:w-[200px]"
                      isLoading={isSubmitting}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleClose(resetForm)}
                      className="opacity-50 xl:w-[200px]"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleUpdateProfile}
                    className="xl:w-[300px]"
                  >
                    Update Profile
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </section>
  );
};

export default AccountSection;
