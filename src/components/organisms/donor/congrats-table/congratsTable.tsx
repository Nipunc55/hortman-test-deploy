import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { t } from "i18next";
import CongratsIcon from "../../../../assets/svg/congratsIcon";

const CongratsTable = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/donor/educational-material");
  };

  const handleSubmitHome = () => {
    navigate("/donor");
  };
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="bg-white w-full rounded-xl shadow-lg min-h-[553px] flex items-center justify-center">
        <div className="flex flex-col gap-8 items-center ">
          <CongratsIcon />
          <div className="text-center flex flex-col">
            <span className="text-primary text-9xl font-normal">
              {t("congratulations")}!
            </span>
            <div className="text-center max-w-[307px]">
              <span className="text-base font-normal">
                {t("congrats-para")}
              </span>
            </div>
          </div>
          <Button
            placeholder={""}
            onClick={handleSubmitHome}
            className="home-button "
          >
            <div className="home-button-text">{t("home")}</div>
          </Button>
          <Button
            placeholder={""}
            onClick={handleSubmit}
            className="edu-button"
          >
            <div className="">{t("educational-materials")}</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CongratsTable;
