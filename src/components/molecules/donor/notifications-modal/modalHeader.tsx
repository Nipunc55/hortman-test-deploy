import { t } from "i18next";

const ModalHeader = () => {
  return (
    <div className="text-xsxl font-medium text-textSecondary uppercase pt-[14px] px-4 pb-2.5 border-b border-secondary">
      {t("notifications")}
    </div>
  );
};

export default ModalHeader;
