import { t } from "i18next";
import { useEffect, useState } from "react";
import { InstagramIcon } from "../../../../assets/svg/instagramIcon";
import LinkedinIcon from "../../../../assets/svg/linkedinIcon";
import WebMarkIcon from "../../../../assets/svg/webMarkIcon";
import i18n from "../../../../i18n";

const TableRow = () => {
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
    <div className="border-t border-secondary w-full mt-5">
      <div className="flex justify-center pt-5">
        <div className="w-full flex pb-16 px-20">
          <div className="w-1/2 flex flex-col justify-center items-center text-center">
            <div className="text-base font-bold  mb-4">
              {t("hortman-clinics")}
            </div>
            <div className="text-[10px] text-[#636363] font-bold">
              {t("address")}
            </div>
            <div
              className={`text-xsxl font-normal ${isArabic && "text-right"}`}
            >
              {t("address-line-1")}
              <br />
              {t("address-line-2")}
            </div>
            <div className="flex gap-4">
              <div className="w-1.875 h-1.875">
                <InstagramIcon />
              </div>
              <div className="w-1.875 h-1.875">
                <LinkedinIcon />
              </div>
              <div className="w-1.875 h-1.875">
                <WebMarkIcon />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center">
            <div className="text-base font-bold mb-4">{t("quick-contact")}</div>
            <div
              className={`text-[14px] font-normal flex gap-2 ${
                isArabic && "flex-row-reverse"
              }`}
            >
              <span className="text-xsxl font-bold">{t("mobile")}</span>
              <span className="text-xsxl font-normal"> +971 52 200 5011</span>
            </div>
            <div
              className={`text-[14px] font-normal flex gap-2 ${
                isArabic && "flex-row-reverse"
              }`}
            >
              <span className="text-xsxl font-bold">{t("landline")}</span>
              <span className="text-xsxl font-normal"> +971 4 566 2615</span>
            </div>
            <div
              className={`text-[14px] font-normal flex gap-2 ${
                isArabic && "flex-row-reverse"
              }`}
            >
              <span className="text-xsxl font-bold">{t("email")}</span>
              <span className="text-xsxl font-normal">
                info@hortman-stemcell.com
              </span>
            </div>
            <div
              className={`text-[14px] font-normal flex gap-2 ${
                isArabic && "flex-row-reverse"
              }`}
            >
              <span className="text-xsxl font-bold">{t("web")}</span>
              <span className="text-xsxl font-normal">
                www.hortman-stemcell.com
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 w-full h-[231px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.2193561465488!2d55.28409787483842!3d25.22953573039114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42ef35663a23%3A0x50593e09a47e07fd!2sSheraton%20Grand%20Hotel%2C%20Dubai!5e0!3m2!1sen!2slk!4v1703101666619!5m2!1sen!2slk"
          className="w-full h-full rounded-xlz"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default TableRow;
