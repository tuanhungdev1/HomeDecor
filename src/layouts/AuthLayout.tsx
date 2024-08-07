import { Logo } from "@/components/shared";
import { Heading } from "@/components/typography";
import AuthImage from "../assets/image/ChairImage.png";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="w-full h-[100vh] flex">
      <div className="relative flex justify-center flex-1 bg-secondary-gray">
        <Logo className="absolute text-4xl -translate-x-1/2 top-16 left-1/2" />
        <img src={AuthImage} alt="" className="" />
      </div>

      {/* #F2F4F6 */}
      <div className="flex-1">
        <div className="mt-[200px] ml-28 ">
          <Heading className="mb-10 text-5xl">{title}</Heading>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
