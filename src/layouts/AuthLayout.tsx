interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div>
      {title}

      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
