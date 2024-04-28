import { useEffect, useState } from "react";
import { type DashboardCardPropsTypes } from "../../../../organisms/admin/adminDashboard/cardsContainer/CardsContainer";
import i18n from "../../../../../i18n";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";

// Define the prop types

// Create the DashboardCard component with the specified prop types
const DashboardCard = ({ data }: { data: DashboardCardPropsTypes }) => {
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  return (
    <div className="bg-white rounded-2.5 w-full max-w-[262px] py-3 px-6">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex flex-col gap-px">
          {isArabic ? (
            <span className="text-base font-medium capitalize text-black-500">
              {data?.translatedTitle}
            </span>
          ) : (
            <span className="text-base font-medium capitalize text-black-500">
              {data?.title}
            </span>
          )}
          <span className="text-9xl font-medium">
            {data?.count ?? <LoaderIconSvg />}
          </span>
        </div>
        <div> {data?.icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
