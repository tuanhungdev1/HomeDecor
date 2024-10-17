import { Logo } from "@/components/shared";
import { Card } from "antd";

interface AuthAdminLayoutProps {
  children: React.ReactNode;
  image: string;
}

const AuthAdminLayout: React.FC<AuthAdminLayoutProps> = ({
  children,
  image,
}) => {
  return (
    <div className="flex w-screen h-screen select-none">
      <div className="relative flex-1 hidden lg:block">
        <img src={image} alt="Background Login Image" className="full-cover" />
        <span className="absolute -translate-x-1/2 top-20 left-1/2">
          <Logo className="text-4xl xl:text-5xl" />
        </span>
      </div>
      <div className="flex-1 p-4 flex-center">
        <Card className="w-[360px] xl:w-[55%] 2xl:w-[45%]">{children}</Card>
      </div>
    </div>
  );
};

export default AuthAdminLayout;
