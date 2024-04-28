import { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const EducationalMaterialVideoGridCard = ({
  id,
  videoPath,
  date,
  title
}: {
  id: string;
  videoPath: string;
  date: string;
  title: string;
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
    <div
      key={id}
      className={`flex flex-col gap-gap7 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[331.819px] max-h-[203.845px] w-full h-full">
        <video src={videoPath} className="w-full h-full object-contain" />
      </div>
      <div className="text-xsxl font-normal">{date}</div>
      <div className="text-lg font-medium capitalize">{title}</div>
    </div>
  );
};

export default EducationalMaterialVideoGridCard;
