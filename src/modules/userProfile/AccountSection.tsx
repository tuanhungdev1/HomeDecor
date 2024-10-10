import { Input } from "@/components/input";
import Label from "@/components/label/Label";
import { Heading } from "@/components/typography";
import { UserUpdate } from "@/types/type";
import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { useAppDispatch } from "@/hooks/hooks";

import toast, { Toaster } from "react-hot-toast";
import { selectUser, selectUserStatus } from "@/stores/selectors/userSelector";

import { selectAuthError } from "@/stores/selectors/authSelector";
import { updateUserInfor } from "@/stores/slices/userSlice";

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
  const dispatch = useAppDispatch();
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  const user = useSelector(selectUser);

  const userStatus = useSelector(selectUserStatus);

  const userError = useSelector(selectAuthError);
  const initialValues: UserUpdate = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    displayName: user?.displayName,
    dateOfBirth: user?.dateOfBirth,
  };

  const handleSubmit = async (
    values: UserUpdate,
    { setSubmitting }: FormikHelpers<UserUpdate>
  ) => {
    const userUpdateData = {
      userId: user!.id,
      userInfor: values,
    };

    await dispatch(updateUserInfor(userUpdateData)).unwrap();

    setSubmitting(false);
  };

  const handleUpdateProfile = () => {
    setIsUpdateProfile(true);
  };

  const handleCloseUpdateProfile = () => {
    setIsUpdateProfile(false);
  };

  useEffect(() => {
    if (userStatus === "succeeded") {
      toast.success("Updated User in successfully!");
    } else if (userStatus === "rejected" && userError) {
      toast.error(userError);
    }

    return () => {
      toast.remove();
    };
  }, [userStatus, userError]);

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
                placeholder="First name"
                id="firstName"
                disabled={!isUpdateProfile}
                value={user?.firstName}
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
                value={user?.lastName}
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
                value={user?.displayName}
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
                placeholder="Email"
                id="dateOfBirth"
                disabled={!isUpdateProfile}
                value={user?.dateOfBirth}
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
                    isLoading={userStatus === "pending"}
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
        <Toaster />
      </div>
    </section>
  );
};

export default AccountSection;
