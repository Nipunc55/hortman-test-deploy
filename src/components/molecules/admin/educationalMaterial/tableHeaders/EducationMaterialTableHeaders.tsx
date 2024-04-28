import { t } from "i18next";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";

const EducationMaterialTableHeaders = () => {
  return (
    <div className="flex flex-row text-base font-medium pb-2.5 items-center justify-center">
      <div className="flex-[4]">{t("title")}</div>
      <div className="flex-[1.5] flex justify-start items-center gap-1">
        <span>{t("author")}</span>
        <DropDownArrow />
      </div>
      <div className="flex-[1.2]">{t("catergories")}</div>
      <div className="flex-[2.5]">{t("status")}</div>
      <div className="flex-1">{t("action")}</div>
    </div>
  );
};

export default EducationMaterialTableHeaders;
