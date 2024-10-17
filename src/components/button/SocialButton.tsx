import { Button } from "antd";

interface SocialButtonProps {
  title: string;
  urlIcon?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ title, urlIcon }) => {
  return (
    <Button className="w-full">
      <img src={urlIcon} alt="logo" className="w-4" />

      {title}
    </Button>
  );
};

export default SocialButton;
