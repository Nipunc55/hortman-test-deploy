import { t } from "i18next";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";

const PaymentTableHeader = () => {
  return (
    <div className="flex pt-6 pb-3 px-5 flex-row text-base font-medium  items-center justify-center border-y border-[#EFE8D8]">
      <div className="flex-[3]">{t("date")}</div>
      <div className="flex-[2.5] flex justify-start items-center gap-1">
        <span>{t("package")}</span>
        <DropDownArrow />
      </div>
      <div className="flex-[3] flex justify-start items-center gap-1">
        <span>{t("donor-name")}</span>
        <DropDownArrow />
      </div>
      <div className="flex-[2] flex justify-start items-center gap-1">
        <span>{t("type")}</span>
        <DropDownArrow />
      </div>
      <div className="flex-[2] flex justify-start items-center gap-2">
        <span>{t("amount")}</span>
      </div>
      <div className="flex-[2.5]">{t("status")}</div>
      <div className="flex-[1.5]">{t("action")}</div>
    </div>
  );
};

export default PaymentTableHeader;
