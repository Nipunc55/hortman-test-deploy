import { t } from "i18next";
import { TableHeaderSecondary } from "../../../atoms/donor/typo";

const TableHeader = () => {
  return (
    <div className="flex flex-col gap-px items-start px-10 p-5 border-b border-secondary">
      <TableHeaderSecondary typo={`${t("HSCL-Consent-Form")}`} />
    </div>
  );
};

export default TableHeader;
