import { Logo } from "@/components/shared";
import { Heading } from "@/components/typography";
import AuthImage from "../assets/image/ChairImage.png";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="w-full md:h-[100vh] flex flex-col lg:flex-row">
      <div className="relative flex justify-center md:flex-1 w-full bg-secondary-gray h-[450px] lg:h-full">
        <Logo className="absolute text-3xl -translate-x-1/2 top-10 left-1/2 xl:text-4xl" />
        <img src={AuthImage} alt="" className="object-contain" />
      </div>

      {/* #F2F4F6 */}
      <div className="flex-1">
        <div className="mt-8 lg:mt-[200px] xl:mr-[40px] md:mr-[20px] md:ml-[20px] px-8 2xl:ml-[50px] 2xl:mt-[300px]">
          <Heading className="mb-4 text-2xl xl:text-5xl xl:mb-6">
            {title}
          </Heading>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
