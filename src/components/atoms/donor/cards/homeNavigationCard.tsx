import { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const HomeNavigationCard = ({
  Icon,
  title,
  arabicTitle
}: {
  Icon: JSX.Element;
  title: string;
  arabicTitle: string;
}) => {
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
    <div className="homeCard flex flex-col justify-center items-center gap-2 hover:scale-95 duration-300 cursor-pointer">
      <div>{Icon}</div>
      {isArabic ? (
        <div className="text-center text-xsxl font-normal">{arabicTitle}</div>
      ) : (
        <div className="text-center text-xsxl font-normal">{title}</div>
      )}
    </div>
  );
};

export default HomeNavigationCard;
