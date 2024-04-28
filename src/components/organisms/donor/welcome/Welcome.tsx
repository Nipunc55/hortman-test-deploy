/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import { t } from "i18next";
import LogoBlack from "../../../../assets/svg/LogoBlack";
import { useEffect, useState } from "react";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage
} from "../../../../utils/common/accessLocalStorage";
import { createDonorApplication } from "../../../../api/donor";
import DonorRegisterIcon from "../../../../assets/svg/DonorRegisterIcon";

const Welcome = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setUserId(getDataFromLocalStorage("userId"));
  }, []);

  const handleClickDonorIcon = async () => {
    const { apiSuccess, apiError }: any = await createDonorApplication(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      await setDataToLocalStorage(
        "donorApplicationId",
        apiSuccess?.data?.data?._id ?? ""
      );
      navigate("/quick-setup");
    } else if (apiError) {
      // alert(apiError.response.data.message);
      console.log(apiError.response.data.message);
      window.location.reload();
    }
    // navigate("/quick-setup");
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="flex flex-col items-center space-y-4 mt-[2%] gap-20">
        <LogoBlack />
        <div className="flex flex-col gap-6 items-center ">
          <span className="welocme-page-heading">{t("welcome-para")}</span>
          <div className="flex gap-8 items-center">
            <div
              className="hover:scale-95 duration-500 cursor-pointer"
              onClick={handleClickDonorIcon}
            >
              <DonorRegisterIcon />
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

export default Welcome;
