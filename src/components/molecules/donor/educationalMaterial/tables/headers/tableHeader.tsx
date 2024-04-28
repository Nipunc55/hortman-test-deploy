import { t } from "i18next";
import { TableHeaderSecondary } from "../../../../../atoms/donor/typo";

const TableHeader = () => {
  return (
    <div className="flex flex-col gap-px items-start px-10 pt-5">
      <TableHeaderSecondary typo={`${t("educational-materials")}`} />
    </div>
  );
};

export default TableHeader;
