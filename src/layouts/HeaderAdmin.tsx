import { useEffect, useState } from "react";
import { Avatar, Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

const HeaderAdmin = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`px-10 py-6 fixed w-full z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? "border-b shadow-sm" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          className="w-1/2 rounded-md"
          size="large"
          prefix={<CiSearch size={28} />}
        />

        <div className="flex items-center gap-4">
          <Button
            type="text"
            icon={<IoMdNotificationsOutline size={28} />}
            className="rounded-full"
            size="large"
          />
          <Avatar
            size={50}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
