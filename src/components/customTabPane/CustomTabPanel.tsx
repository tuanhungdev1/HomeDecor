import { Tabs } from "antd";
import { scroller } from "react-scroll";

interface CustomTabPaneProps {
  tab: React.ReactNode;
  key: string;
  children: React.ReactNode;
}

const CustomTabPane: React.FC<CustomTabPaneProps> = ({
  tab,
  key,
  children,
}) => {
  const handleTabClick = () => {
    scroller.scrollTo(key, {
      smooth: true,
      offset: -70,
      duration: 500,
    });
  };

  return (
    <div onClick={handleTabClick}>
      <Tabs.TabPane tab={tab} key={key}>
        {children}
      </Tabs.TabPane>
    </div>
  );
};

export default CustomTabPane;
