import { t } from "i18next";
import EducationalMaterials from "../../../assets/svg/EducationalMaterials";
import LogoBlack from "../../../assets/svg/LogoBlack";
import Footer from "../../../components/organisms/admin/footer/footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../redux/slices/QuickSetupGuideSlices";

const MoreInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/quick-setup");
    dispatch(updateStep(4));
  };
  return (
    <div className="primary-background w-full ">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between items-center min-h-screen">
          <div className="flex flex-col items-center space-y-4 mt-[2%] gap-20">
            <LogoBlack />
            <div className="flex flex-col gap-6 items-center ">
              <span className="welocme-page-heading">{t("more-info")}</span>
              <div className="flex gap-8 items-center">
                <div
                  className="hover:scale-95 duration-500 cursor-pointer"
                  onClick={handleClick}
                >
                  <EducationalMaterials />
                </div>
              </div>
              <div
                onClick={() => {
                  dispatch(updateStep(5));
                  navigate("/quick-setup");
                }}
                className="flex items-center hover:scale-95 duration-500 cursor-pointer"
              >
                <span className="welocme-page-heading">{t("skip-info")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <g clipPath="url(#clip0_8248_1732)">
                    <path
                      d="M10.4165 25H39.5832"
                      stroke="#DFC277"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.25 33.3333L39.5833 25"
                      stroke="#DFC277"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.25 16.6665L39.5833 24.9998"
                      stroke="#DFC277"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8248_1732">
                      <rect width="50" height="50" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <Footer textColor="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoPage;
