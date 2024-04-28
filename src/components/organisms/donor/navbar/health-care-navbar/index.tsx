import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../../../../assets/svg/logo";
import NotificationBellIcon from "../../../../../assets/svg/notificationBellIcon";
import NotificationsModal from "../../../../atoms/donor/modals/NotificationsModal";
import UserIcon from "../../../../../assets/svg/userIcon";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import { getUserById } from "../../../../../api/user";

const navItems = [
  {
    name: "Home",
    path: "/health-care",
    value: "0"
  },
  {
    name: "My Profile",
    path: "/quick-setup/health-care-professional",
    value: "1"
  },
  {
    name: "Educational Resources",
    path: "/health-care/educational-material",
    value: "2"
  },
  {
    name: "Contact Us",
    path: "/health-care/contact-us",
    value: "3"
  },
  {
    name: "Logout",
    path: "/login",
    value: "4"
  }
];
const Navbar = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("healthCareUserID");
    console.log(userId);
    const { apiError, apiSuccess }: any = await getUserById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      console.log(apiSuccess?.data?.data?.name);
      const name = apiSuccess?.data?.data?.name;
      const role = apiSuccess?.data?.data?.role;
      setUserData({ name, role });
      // console.log(role);
    } else if (apiError) {
      alert(apiError.response.data.message);
    }
  };

  useEffect(() => {
    void loadPersonalData();
  }, []);
  return (
    <div className="">
      {/* Header - navbar */}
      <div className="flex justify-between items-center container mx-auto py-5">
        <div className="">
          <Logo />
        </div>
        <div className="flex items-center gap-2 text-primary">
          <div
            className="w-1.875 h-1.87"
            onClick={() => setIsNotificationModalOpen(true)}
          >
            <NotificationBellIcon />
          </div>
          <NotificationsModal
            open={isNotificationModalOpen}
            handleOpen={setIsNotificationModalOpen}
          />
          |
          {userData ? (
            <div className="flex flex-col">
              <span className="font-medium text-textPrimary text-lg capitalize">
                {userData.name}
              </span>
              <span className="text-black-500 text-[14px] capitalize font-normal">
                {userData.role === "HEALTH" ? "Health Care Professional" : ""}
              </span>
            </div>
          ) : (
            <span>Loading...</span>
          )}
          <div className="w-1.875 h-1.875">
            <UserIcon />
          </div>
        </div>
      </div>
      {/* Nav-Items - navbar */}
      <div className="flex  bg-primary">
        <div className="flex gap-8 container mx-auto">
          {navItems.map((item) => (
            <Link
              key={item?.name}
              to={item?.path}
              className="text-base font-medium capitalize text-white  flex py-3.75  cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out "
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
