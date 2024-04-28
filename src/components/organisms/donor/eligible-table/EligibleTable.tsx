import { useNavigate } from "react-router-dom";

import { Button } from "@material-tailwind/react";
import { t } from "i18next";
import EligibleIcon from "../../../../assets/svg/eligibleIcon";

const EligibleTable = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/donor/consent-form");
  };
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="bg-white w-full rounded-xl shadow-lg min-h-[525px] flex items-center justify-center">
        <div className="flex flex-col gap-8 items-center ">
          <EligibleIcon />
          <div className="text-center flex flex-col">
            <span className="text-primary text-9xl font-normal">
              {t("eligible")}
            </span>
            <div className="text-center max-w-[299px]">
              <span className="text-2xl font-medium">
                {t("congratulations")} {""}
              </span>
              <span className="text-2xl font-normal">{t("eligible-para")}</span>
            </div>
          </div>
          <Button
            placeholder={""}
            onClick={handleSubmit}
            className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-base font-bold w-[210px]"
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EligibleTable;
