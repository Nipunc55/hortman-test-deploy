import { t } from "i18next";
import { useEffect, useState } from "react";
import i18n from "../../../../i18n";
import { TableTitle } from "../../../atoms/donor/typo";

const TableHeader = () => {
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
      className={`flex p-6 border-b border-secondary bg-white rounded-t-xl shadow-lg ${
        isArabic ? "justify-end" : "justify-between"
      }`}
    >
      <TableTitle
        text={`${t("notifications")}`}
        textSize="text-6xl"
        color="text-textSecondary"
      />
    </div>
  );
};

export default TableHeader;
