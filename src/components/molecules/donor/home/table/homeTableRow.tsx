import { Link } from "react-router-dom";
import BellIcon from "../../../../../assets/svg/bellIcon";
import StatusIcon from "../../../../../assets/svg/statusIcon";
import PaymentsIcon from "../../../../../assets/svg/paymentsIcon";
import EducationaMaterialICon from "../../../../../assets/svg/educationaMaterialICon";
import ContactUsIcon from "../../../../../assets/svg/contactUsIcon";
import HomeNavigationCard from "../../../../atoms/donor/cards/homeNavigationCard";
import MyProfile from "../../../../../assets/svg/myProfile";

const CardData = [
  {
    id: "1",
    Icon: <BellIcon />,
    title: "Notifications",
    arabicTitle: "إشعارات",
    path: "/donor/notifications",
    value: "1"
  },
  {
    id: "2",
    Icon: <StatusIcon />,
    title: "Current Status",
    arabicTitle: "الحالة الحالية",
    path: "/donor/stem-cell-packages",
    value: "2"
  },
  {
    id: "3",
    Icon: <PaymentsIcon />,
    title: "Payments",
    arabicTitle: "المدفوعات",
    path: "/donor/payments",
    value: "3"
  },
  {
    id: "4",
    Icon: <MyProfile />,
    title: "My Profile",
    arabicTitle: "الملف الشخصي",
    path: "/donor/my-profile",
    value: "4"
  },
  {
    id: "5",
    Icon: <EducationaMaterialICon />,
    title: "Educational Material",
    arabicTitle: "المواد التعليمية",
    path: "/donor/educational-material",
    value: "4"
  },
  {
    id: "6",
    Icon: <ContactUsIcon />,
    title: "Contact Us",
    arabicTitle: "اتصل بنا",
    path: "/donor/contact-us",
    value: "5"
  }
];

const HomeTableRow = () => {
  return (
    <div className="flex m-auto ">
      <div className="grid grid-cols-3 gap-5">
        {CardData.map((data) => (
          <Link key={data?.id} to={data?.path}>
            <HomeNavigationCard
              key={data.id}
              Icon={data.Icon}
              title={data.title}
              arabicTitle={data.arabicTitle}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeTableRow;
