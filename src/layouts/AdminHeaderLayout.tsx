import { Breadcrumb } from "antd";

interface AdminHeaderLayoutProps {
  rightSide?: React.ReactNode;
  title: string;
  items: { title: React.ReactNode }[];
}

const AdminHeaderLayout: React.FC<AdminHeaderLayoutProps> = ({
  rightSide,
  title,
  items,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-4xl font-bold">{title}</h1>
        <Breadcrumb items={items} className="text-base " />
      </div>
      <div>{rightSide}</div>
    </div>
  );
};

export default AdminHeaderLayout;
