import { useEffect, useState } from "react";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import Checked from "../../../../../assets/svg/Checked";
import UnChecked from "../../../../../assets/svg/UnChecked";
// import BasicButton from "../../../../atoms/donor/buttons/BasicButton";
import { updateApplicationByUser } from "../../../../../api/donor";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import { IconButton } from "@material-tailwind/react";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";

enum BankingType {
  FamilyBanking = "Family Banking",
  PublicBanking = "Public Banking"
}

const BankingDetails = ({ setStep }: { setStep: (step: number) => void }) => {
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
  const [selectedBankingType, setSelectedBankingType] = useState<BankingType>(
    BankingType.FamilyBanking
  );

  const handleButtonClick = async () => {
    const donorApplicationId =
      await getDataFromLocalStorage("donorApplicationId");
    const payload = {
      banking: selectedBankingType
    };
    const { apiSuccess, apiError }: any = await updateApplicationByUser(
      payload,
      donorApplicationId
    );

    if (apiSuccess && apiSuccess.status === 200) {
      if (selectedBankingType === BankingType.FamilyBanking) {
        setStep(7);
      } else if (selectedBankingType === BankingType.PublicBanking) {
        setStep(9);
      }
    } else if (apiError) {
      console.log(apiError);

      // alert(apiError.response.data.message);
    }
  };

  const handleBackButtonClick = () => {
    setStep(5);
  };
  return (
    <div className=" bg-white rounded-lg py-2.5 mt-4 w-[50rem] mb-20 ">
      <div className=" border-b-[1px] border-b-secondary">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("choose-bank")}
        </span>
      </div>
      <div
        className={`py-10 px-15 flex flex-col gap-8 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <div
          className={`flex flex-row gap-2  ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <div
            onClick={() => setSelectedBankingType(BankingType.FamilyBanking)}
            className="mt-1 cursor-pointer"
          >
            {selectedBankingType === BankingType.FamilyBanking ? (
              <Checked />
            ) : (
              <UnChecked />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-black-500 text-2xl font-medium">
              {t("family-banking")}
            </span>
            <span className=" font-normal text-sm">
              {t("family-banking-para")}
            </span>
          </div>
        </div>

        <div
          className={`flex flex-row gap-2  ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <div
            onClick={() => setSelectedBankingType(BankingType.PublicBanking)}
            className="mt-1 cursor-pointer"
          >
            {selectedBankingType === BankingType.PublicBanking ? (
              <Checked />
            ) : (
              <UnChecked />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-black-500 text-2xl font-medium">
              {t("public-banking")}
            </span>
            <span className=" font-normal text-sm">
              {t("public-banking-para")}
            </span>
          </div>
        </div>

        {/* <div className="flex items-center justify-center mt-18">
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
      </div>
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
    </div>
  );
};

export default BankingDetails;
