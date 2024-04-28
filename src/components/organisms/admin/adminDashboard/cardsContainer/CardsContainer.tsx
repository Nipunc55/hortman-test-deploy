/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { DonorsIcon } from "../../../../../assets/svg/donorsIcon";
import { HealthProviderIcon } from "../../../../../assets/svg/healthProviderIcon";
import { HsclUserIcon } from "../../../../../assets/svg/hsclUserIcon";
import NotificationBellIconGradient from "../../../../../assets/svg/notificatiobBellIocnGradient";
import DashboardCard from "../../../../molecules/admin/adminDashboard/cards/dashboardCard";
import { getUsersCount } from "../../../../../api/analytic";
import { generateToken } from "../../../../../firebase/config";
import { registerDevice } from "../../../../../api/deviceTokens";

export type DashboardCardPropsTypes = {
  key: any;
  title: string;
  translatedTitle: string;
  count: number | null;
  icon: any;
};

const CardsContainer = () => {
  const [userCount, setUserCount] = useState(null);
  const [donorCount, setDonorCount] = useState(null);
  const [healthCount, setHealthCount] = useState(null);
  const [notificationCount, setNotificationCount] = useState(null);

  const getDonorCount = async () => {
    const { apiSuccess }: any = await getUsersCount();

    if (apiSuccess && apiSuccess.status === 200) {
      setHealthCount(apiSuccess?.data?.data?.healthcare);
      setDonorCount(apiSuccess?.data?.data?.donor);
      setUserCount(apiSuccess?.data?.data?.admin);
      setNotificationCount(apiSuccess?.data?.data?.notification);
    }
  };
  useEffect(() => {
    let isMounted = true; // Flag to track component mounting state

    async function getToken() {
      const notificationToken = localStorage.getItem("notification_token");
      if (!notificationToken) {
        const token = await generateToken();

        if (isMounted && token) {
          await registerDevice("token", token, "WEB");
          localStorage.setItem("notification_token", token);
        }
      }
    }

    void getToken();

    // Cleanup function to cancel any pending tasks when component unmounts
    return () => {
      isMounted = false; // Mark component as unmounted
    };
  }, []);
  useEffect(() => {
    void getDonorCount();
  }, []);

  const data: DashboardCardPropsTypes[] = [
    {
      key: "1",
      title: "HSCL Users",
      translatedTitle: "مستخدمو HSCL",
      count: userCount,
      icon: <HsclUserIcon />
    },
    {
      key: "2",
      title: "Donors",
      translatedTitle: "الجهات المانحة",
      count: donorCount,
      icon: <DonorsIcon />
    },
    {
      key: "3",
      title: "Healthcare Provider",
      translatedTitle: "مقدّم الرعاية الصحية",
      count: healthCount,
      icon: <HealthProviderIcon />
    },
    {
      key: "4",
      title: "Notifications",
      translatedTitle: "إشعارات",
      count: notificationCount,
      icon: <NotificationBellIconGradient />
    }
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {data.map((item) => (
          <DashboardCard key={item?.key} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
