import { t } from "i18next";
import { SecondarySearchBar } from "../../../../atoms/donor/searchBar/SearchBar";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";

const PaymentTableHeader = ({
  InputCHange,
  Value
}: {
  InputCHange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Value: string;
}) => {
  return (
    <>
      <div className="pt-4 pl-8">
        <SecondarySearchBar onChange={InputCHange} value={Value} />
      </div>
      <div className="flex pt-6 px-5 pb-3 text-base font-medium  border-b border-[#EFE8D8]">
        <div className="flex-[2] ">{t("date")}</div>
        <div className="flex-[2.5] flex items-center gap-1">
          <span>{t("package")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[3] flex  items-center gap-1">
          <span>{t("donor-name")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[2] flex  items-center gap-1">
          <span>{t("type")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[2] flex  gap-2">
          <span>{t("amount")}</span>
        </div>
        <div className="flex-[2.5]">{t("status")}</div>
        <div className="flex-[1]">{t("action")}</div>
      </div>
    </>
  );
};

export default PaymentTableHeader;
