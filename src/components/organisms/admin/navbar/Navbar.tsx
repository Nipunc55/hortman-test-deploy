import { Link } from "react-router-dom";
import Logo from "../../../../assets/svg/logo";
import NotificationBellIcon from "../../../../assets/svg/notificationBellIcon";
import UserIcon from "../../../../assets/svg/userIcon";
import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
import {
  getDataFromLocalStorage,
  removeDataFromSessionStorage
} from "../../../../utils/common/accessLocalStorage";
import { getUserById } from "../../../../api/user";
import NotificationsModaAdmin from "../../../atoms/donor/modals/NotificationsModalAdmin";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    value: "0"
  },
  {
    name: "Donor Applications",
    path: "/admin/donor-applications",
    value: "1"
  },
  {
    name: "Payments",
    path: "/admin/payments",
    value: "2"
  },
  {
    name: "Educational Resources",
    path: "/admin/educational-material",
    value: "3"
  },
  {
    name: "Reports",
    path: "/admin/reports",
    value: "4"
  },
  {
    name: "Users",
    path: "/admin/users",
    value: "5"
  }
];
const Navbar = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [isNotificationAvailable, setIsNotificationAvailable] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("adminUserId");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
          <NotificationsModaAdmin
            open={isNotificationModalOpen}
            handleOpen={setIsNotificationModalOpen}
            setIsNotificationModalOpen={setIsNotificationAvailable}
          />
          |
          <div className="flex flex-col">
            {userData ? (
              <div className="flex flex-col">
                <span className="font-medium text-textPrimary text-lg capitalize">
                  {userData.name}
                </span>
                <span className="text-black-500 text-sm capitalize font-normal">
                  {userData.role}
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
              className="text-base font-medium capitalize text-white  flex py-3.75  cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out "
            >
              {item?.name}
            </Link>
          ))}
          <Link
            to={"/login"}
            onClick={async () => {
              localStorage.clear();
              sessionStorage.clear();
              await removeDataFromSessionStorage("access_token");
              await removeDataFromSessionStorage("refresh_token");
              // Cookies.remove("access_token");
              // Cookies.remove("refresh_token");
              // Cookies.remove("__stripe_sid");
              // Cookies.remove("__stripe_mid");
            }}
            className="text-base font-medium capitalize text-white  flex py-3.75  cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out "
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
