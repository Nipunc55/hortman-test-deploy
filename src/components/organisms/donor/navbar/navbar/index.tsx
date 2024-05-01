import { Link, useLocation } from "react-router-dom";
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
    path: "/donor",
    value: "0"
  },
  {
    name: "My Profile",
    path: "/donor/my-profile",
    value: "1"
  },
  {
    // name: "Stem Cell Packages",
    name: "Stem Cell Packages",
    path: "/donor/stem-cell-packages",
    value: "2"
  },
  {
    name: "Payments",
    path: "/donor/payments",
    value: "3"
  },
  {
    name: "Educational Resources",
    path: "/donor/educational-material",
    value: "4"
  },
  {
    name: "Contact Us",
    path: "/donor/contact-us",
    value: "5"
  },
  {
    name: "Logout",
    path: "/login",
    value: "6"
  }
];

const Navbar = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [isNotificationAvailable, setIsNotificationAvailable] = useState(false);

  const [selected, setSelected] = useState("0");
  const route = useLocation().pathname;
  console.log(route);

  useEffect(() => {
    const route = location.pathname;
    const selectedItem: any = navItems.find((item) => item.path === route);
    console.log(selectedItem);
    setSelected(selectedItem?.value);
    console.log("Route changed to:", route);
  }, [route]);

  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("donorUserId");
    const { apiError, apiSuccess }: any = await getUserById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data?.name);
      const name = apiSuccess?.data?.data?.name;
      const role = apiSuccess?.data?.data?.role;
      setUserData({ name, role });
      // console.log(role);
    } else if (apiError) {
      console.log(apiError);

      // alert(apiError.response.data.message);
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
            className="w-1.875 h-1.875 relative"
            onClick={() => setIsNotificationModalOpen(true)}
          >
            <NotificationBellIcon />

            {isNotificationAvailable && (
              <div className="absolute top-0 right-1 h-2.5 w-2.5 bg-[#DF3333] rounded-full"></div>
            )}
          </div>
          <NotificationsModal
            open={isNotificationModalOpen}
            handleOpen={setIsNotificationModalOpen}
            setIsNotificationModalOpen={setIsNotificationAvailable}
          />
          |
          <div className="flex flex-col">
            {userData ? (
              <div className="flex flex-col">
                <span className="font-medium text-textPrimary text-lg capitalize">
                  {userData?.name}
                </span>
                <span className="text-black-500 text-sm capitalize font-normal">
                  {userData?.role}
                </span>
              </div>
            ) : (
              <span>Loading...</span>
            )}
          </div>
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
              className={`text-base font-medium capitalize text-white  flex py-3.75  cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out ${selected === item?.value ? "selected-nav" : ""}`}
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
