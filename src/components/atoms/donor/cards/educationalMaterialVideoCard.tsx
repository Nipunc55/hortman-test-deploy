import { useEffect, useState } from "react";
import EducationalMaterialVideoButton from "../buttons/EducationalMaterialVideoButton";
import i18n from "../../../../i18n";

const EducationalMaterialVideoCard = ({
  id,
  date,
  title,
  video,
  buttonTitle,
  onclickFunction
}: {
  id: string;
  date: string;
  title: string;
  video: string;
  buttonTitle: string;
  onclickFunction: () => void;
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
    <>
      <div className="flex flex-col gap-2" key={id}>
        <div className={`text-xsxl font-normal ${isArabic && "text-right"}`}>
          {date}
        </div>
        <div className="text-base font-medium capitalize max-w-[300px]">
          {title}
        </div>
        <div className="w-[380px] h-[210.53px]">
          <img
            src={video}
            alt={title}
            className="object-cover h-full w-full rounded-[20px]"
          />
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <EducationalMaterialVideoButton
            title={buttonTitle}
            onClickFun={onclickFunction}
          />
        </div>
      </div>
    </>
  );
};

export default EducationalMaterialVideoCard;
