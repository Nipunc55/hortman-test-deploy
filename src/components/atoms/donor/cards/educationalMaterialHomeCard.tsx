import { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const EducationalMaterialHomeCard = ({
  imgPath,
  id,
  date,
  title,
  description
}: {
  imgPath: string;
  id: string;
  date: string;
  title: string;
  description: string;
  arabicTitle: string;
  arabicDescription: string;
}) => {
  // const truncatedDescription = description.split(" ").slice(0, 12).join(" ");

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
    <div className="flex gap-4 items-start w-full border-b border-secondary py-3">
      <img
        src={imgPath}
        alt={id}
        className="w-full max-w-[80px] h-[80px] object-cover rounded-[5px]"
      />
      <div
        className={`w-full flex flex-col ${
          isArabic ? "text-right" : "text-left"
        } justify-${isArabic ? "end" : "start"}`}
      >
        <div className="text-xsxl font-normal">{date}</div>
        {isArabic ? (
          <div className="text-base font-bold max-w-[278px]">{title}</div>
        ) : (
          <div className="text-base font-bold max-w-[278px]">{title}</div>
        )}
        {isArabic ? (
          <div className="text-xsxl font-normal max-w-[278px]">
            {description}
          </div>
        ) : (
          <div className="text-xsxl font-normal max-w-[278px]">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalMaterialHomeCard;
