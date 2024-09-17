import { BackButton } from "@/components/backButton";
import { LoadingOverlay } from "@/components/loadingOverlay";
import { Heading } from "@/components/typography";
import { UserTabSection } from "@/modules/userProfile";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {
  return (
    <div>
      <LoadingOverlay />
      <div className="2xl:hidden">
        <BackButton />
      </div>
      <Heading className="py-10 text-5xl text-center select-none">
        My Account
      </Heading>

      <div className="flex flex-col gap-14 lg:flex-row lg:gap-10">
        <div className="flex-1">
          <UserTabSection />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
