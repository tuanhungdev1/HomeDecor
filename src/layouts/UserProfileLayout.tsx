import { BackButton } from "@/components/backButton";
import { Heading } from "@/components/typography";
import { userProfileItemList } from "@/constants/userProfileItems";
import { useAuth } from "@/hooks/useAuth";
import {
  AccountSection,
  AddressSection,
  OrdersSection,
  UserTabSection,
  WishlistSection,
} from "@/modules/userProfile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const UserProfileLayout: React.FC = () => {
  const { handleLogout } = useAuth();
  const [currentTab, setCurrentTab] = useState(userProfileItemList[0].id);
  const [tabContent, setTabContent] = useState<React.ReactNode>(
    <AccountSection />
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedTab = async (tabId: string) => {
    setCurrentTab(tabId);
    setIsLoading(true);
    await loadTabContent(tabId);
  };

  const loadTabContent = async (tabId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    switch (tabId) {
      case "account":
        setCurrentTab("account");
        setTabContent(<AccountSection />);
        break;
      case "address":
        setCurrentTab("address");
        setTabContent(<AddressSection />);
        break;
      case "orders":
        setCurrentTab("orders");
        setTabContent(<OrdersSection />);
        break;
      case "wishlist":
        setCurrentTab("wishlist");
        setTabContent(<WishlistSection />);
        break;

      case "reset-password":
        navigate("/auth/forgot-password");
        break;
      case "log-out":
        await handleLogout();
        break;
      default:
        setTabContent(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const initializeUserData = async () => {
      await loadTabContent(currentTab);
    };

    initializeUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);
  return (
    <div>
      <div className="2xl:hidden">
        <BackButton />
      </div>
      <Heading className="py-10 text-5xl text-center select-none lg:py-20 xl:pb-28 xl:pt-14">
        My Account
      </Heading>

      <div className="flex flex-col gap-14 lg:flex-row lg:gap-10 xl:gap-32 2xl:gap-20">
        <div className="flex-1">
          <UserTabSection
            currentTab={currentTab}
            handleSelected={handleSelectedTab}
          />
        </div>
        <div className="flex-1 xl:flex-[2_2_0%]">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <BarLoader height={6} loading speedMultiplier={1} width={150} />
            </div>
          ) : (
            tabContent
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
