import { Button, Checkbox, Dialog } from "@material-tailwind/react";
import AgreedIcon from "../../../../assets/svg/agreedIcon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import i18n from "../../../../i18n";

const TableRow = () => {
  const conditions = [
    {
      id: 1,
      condition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci.",
      arabicCondition:
        "لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci. لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci."
    },
    {
      id: 1,
      condition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci.",
      arabicCondition:
        "لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci. لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci."
    },
    {
      id: 1,
      condition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante consectetur, lobortis erat pellentesque, porta orci.",
      arabicCondition:
        "لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci. لوريم إيبسوم دولور سيت أميت، consectetur adipiscing إيليت. Quisque sit amet nunc eu ligula congue gravida. Aenean nec ante ante consectetur، lobortis erat pellentesque، porta orci."
    }
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const handleAgreed = () => {
    navigate("/donor/checkout");
  };
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  const [checked, setChecked] = useState(false);

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
    <div className="pt-3 px-10 pb-5">
      <div className={`text-xsxl font-normal ${isArabic && "text-right"}`}>
        Dated: 20 August 2023
      </div>
      <div className={`text-base font-bold mb-4 ${isArabic && "text-right"}`}>
        {t("consent-form-description")}
      </div>
      {conditions.map((condition) => (
        <div
          key={condition.id}
          className={`text-base font-normal ${isArabic && "text-right"}`}
        >
          {isArabic ? condition.arabicCondition : condition.condition}
        </div>
      ))}
      <div className="flex flex-col gap-5 items-center justify-center py-5">
        <div
          className={`flex items-center ${
            isArabic && "flex-row-reverse"
          } flex-row`}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            crossOrigin={undefined}
            className="border-[1] border-primary"
          />
          <div className="flex flex-row items-center justify-center gap-2">
            <span className=" text-base">{t("accept-condition")}</span>
          </div>
        </div>
        <Button
          onClick={handleOpen}
          disabled={!checked}
          placeholder={""}
          className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-base font-bold w-[156px]"
        >
          {t("agree")}
        </Button>
        <Dialog
          open={open}
          handler={handleOpen}
          className="p-5"
          size="xs"
          placeholder={""}
        >
          <div className="agreed-modal justify-center flex">
            <div className="flex flex-col gap-5 items-center justify-center">
              <AgreedIcon />
              <Button
                placeholder={""}
                onClick={handleAgreed}
                disabled={!checked}
                className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-base font-bold w-[156px]"
              >
                {t("agree")}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TableRow;
