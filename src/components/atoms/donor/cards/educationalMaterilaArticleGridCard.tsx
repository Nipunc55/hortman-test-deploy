import { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const EducationalMaterilaArticleGridCard = ({
  id,
  date,
  title,
  imgPath,
  description
}: {
  id: string;
  date: string;
  title: string;
  imgPath: string;
  description: string;
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
      className={`flex flex-col gap-gap7 min-h-[433px] ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-[336.4px] w-[336.4px] max-h-[205.381px] h-[205.381px]">
        <img src={imgPath} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="text-xsxl font-normal">{date}</div>
      <div className="text-lg font-medium capitalize">{title}</div>
      <div className="text-base font-normal leading-normal">{description}</div>
    </div>
  );
};

export default EducationalMaterilaArticleGridCard;
