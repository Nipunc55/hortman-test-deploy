import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoYellow from "../../../../assets/svg/logoYellow";
import DonorIcon from "../../../../assets/svg/DonorJourneyIcon";
import HealthcareProfessionalIcon from "../../../../assets/svg/healthcareProfessionalIcon";

const AccountType = () => {
  const navigate = useNavigate();

  const handleClickDonorIcon = () => {
    navigate("/welcome");
  };

  const handleHealthcareProfessionalClick = () => {
    navigate("/quick-setup/health-care-professional");
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 mt-[2%] gap-28">
        <LogoYellow />
        <div className="flex flex-col items-center space-y-8 my-10 ">
          <span className="text-secondary text-base font-normal flex uppercase text-center">
            {t("choiceOfAccType")}
          </span>
          <div className="flex gap-8">
            <div
              className="hover:scale-95 duration-500 cursor-pointer"
              onClick={handleClickDonorIcon}
            >
              <DonorIcon />
            </div>
            <div
              className="hover:scale-95 duration-500 cursor-pointer"
              onClick={handleHealthcareProfessionalClick}
            >
              <HealthcareProfessionalIcon />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer textColor="text-secondary" />
      </div>
    </div>
  );
};

export default AccountType;
