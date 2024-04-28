import React, { useEffect, useState } from "react";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import Checked from "../../../../../assets/svg/Checked";
import UnChecked from "../../../../../assets/svg/UnChecked";
// import BasicButton from "../../../../atoms/donor/buttons/BasicButton";
import { updateApplicationByUser } from "../../../../../api/donor";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import { IconButton } from "@material-tailwind/react";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
enum StemSource {
  codeBludTissue = "Cord Blood/ Tissue",
  adiposeTissue = "Adipose Tissue",
  peripheralBlood = "Peripheral Blood",
  boneMarrow = "Bone Marrow"
}
const SourceOfStem = ({ setStep }: { setStep: (step: number) => void }) => {
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
  const [stemSource, setStemSource] = React.useState<StemSource>(
    StemSource.codeBludTissue
  );

  const handleButtonClick = async () => {
    const donorApplicationId =
      await getDataFromLocalStorage("donorApplicationId");
    const payload = {
      source_stem_cells: stemSource
    };
    const { apiSuccess, apiError }: any = await updateApplicationByUser(
      payload,
      donorApplicationId
    );

    if (apiSuccess && apiSuccess.status === 200) {
      setStep(6);
    } else if (apiError) {
      toast.error(apiError.response.data.message);
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/more-information-of-stem-cell-banking");
  };

  return (
    <div className=" bg-white rounded-lg py-2.5 mt-4 w-[50rem] mb-20">
      <div className=" border-b-[1px] border-b-secondary">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("stem-cell-source")}
        </span>
      </div>

      <div
        className={`py-10 px-15 flex flex-col gap-8 h-[27.375rem] overflow-auto no-scrollbar ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`${
            stemSource !== StemSource.codeBludTissue
              ? " grayscale text-[#ABABAB]"
              : ""
          } flex flex-row gap-2 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <div
            onClick={() => setStemSource(StemSource.codeBludTissue)}
            className="mt-1 cursor-pointer"
          >
            {stemSource === StemSource.codeBludTissue ? (
              <Checked />
            ) : (
              <UnChecked />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium">
              {t("cord-blood-tissue")}
            </span>
            <span className=" font-normal text-sm">
              {t("cord-blood-tissue-para")}
            </span>
            <span className=" font-normal text-sm mt-2">
              {t("cord-blood-tissue-para-2")}
            </span>
          </div>
        </div>

        <div
          className={`${
            stemSource !== StemSource.adiposeTissue
              ? " grayscale text-[#ABABAB] cursor-not-allowed"
              : ""
          } flex flex-row gap-2  ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <div className="mt-1 cursor-not-allowed">
            <UnChecked />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium">{t("adipose-tissue")}</span>
            <span className=" font-normal text-sm">
              {t("adipose-tissue-para")}
            </span>
          </div>
        </div>

        <div
          className={`${
            stemSource !== StemSource.peripheralBlood
              ? " grayscale text-[#ABABAB] cursor-not-allowed"
              : ""
          } flex flex-row gap-2 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <div className="mt-1 cursor-not-allowed">
            <UnChecked />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium">
              {t("peripheral-blood")}
            </span>
            <span className=" font-normal text-sm">
              {t("peripheral-blood-para")}
            </span>
          </div>
        </div>

        <div
          className={`${
            stemSource !== StemSource.boneMarrow
              ? " grayscale text-[#ABABAB] cursor-not-allowed"
              : ""
          } flex flex-row gap-2 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <div className="mt-1 cursor-not-allowed">
            <UnChecked />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-medium">{t("bone-marrow")}</span>
            <span className=" font-normal text-sm">
              {t("bone-marrow-para")}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-center mt-18 mb-5">
        <div className="w-[90px]">
          <BasicButton
            onClick={handleButtonClick}
            styledBorderEnabled={true}
            style={{
              backgroundColor: "#EFE8D8",
              color: "#000000",
              width: "90px",
              paddingLeft: "40px",
              paddingRight: "40px"
            }}
            text={`${t("next")}`}
          />
        </div>
      </div> */}
      <div className="flex items-center justify-between p-5 px-5">
        <div
          onClick={handleBackButtonClick}
          className="flex gap-1 items-center space-x-1.5 cursor-pointer"
        >
          <IconButton
            placeholder={""}
            size="sm"
            className="bg-transparent shadow-none hover:shadow-none"
          >
            <QuestionButtonIcon />
          </IconButton>
          <span className="font-normal text-sm text-primary">{t("back")}</span>
        </div>

        <div
          onClick={handleButtonClick}
          className="flex gap-1 items-center space-x-1.5 cursor-pointer"
        >
          <span className="font-normal text-sm text-primary">{t("next")}</span>
          <IconButton
            placeholder={""}
            size="sm"
            className="bg-transparent shadow-none hover:shadow-none"
          >
            {isArabic ? (
              <QuestionButtonIcon />
            ) : (
              <QuestionButtonIcon isFlipped={true} />
            )}
          </IconButton>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SourceOfStem;
