/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-line no-unused-vars
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable */
/* eslint-disable @typescript-eslint/parser */
import Footer from "../footer/footer";
import OtpInput from "react-otp-input";
import { Alert, Button, Spinner, step } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { otpVerification } from "../../../../api/auth";
import LoginLogoIcon from "../../../../assets/svg/loginLogoIcon";
// import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { type RootState } from "../../../../redux/store";
import {
  removeDataFromSessionStorage,
  setDataToLocalStorage,
  writeDataToSessionStorage
} from "../../../../utils/common/accessLocalStorage";
import { getDonorApplicationByUserId } from "../../../../api/donor_application";
import GoBackIcon from "../../../../assets/svg/goBackIcon";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../../redux/slices/QuickSetupGuideSlices";
import { getStepCountOf } from "../../../../utils/common/stepCalculator";
interface LastSubmissionSections {
  [key: string]: number;
  // Add other sections as needed
}

const Otp = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { t } = useTranslation();
  const phoneNumber = useSelector(
    (state: RootState) => state.loginReducer.phoneNumber
  );
  const dispatch = useDispatch();
  // 0768843147 - donor
  // 0761234567 - admin
  // comment
  const setStep = (step: number) => {
    dispatch(updateStep(step));
  };

  const handleGoBack = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);

    const { apiSuccess, apiError }: any = await otpVerification(
      phoneNumber,
      otp
    );

    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      await removeDataFromSessionStorage("access_token");
      await removeDataFromSessionStorage("refresh_token");
      await writeDataToSessionStorage(
        "access_token",
        apiSuccess.data.data.access_token
      );
      await writeDataToSessionStorage(
        "refresh_token",
        apiSuccess.data.data.refresh_token
      );

      const enteredOTP = "1111";
      const role = apiSuccess.data.data.user.role;

      await setDataToLocalStorage("userId", apiSuccess.data.data.user._id);

      if (otp === enteredOTP && role === "ADMIN") {
        await setDataToLocalStorage(
          "adminUserId",
          apiSuccess.data.data.user._id
        );
        navigate("/admin");
      } else if (otp === enteredOTP && role === "DONOR") {
        await setDataToLocalStorage(
          "donorUserId",
          apiSuccess.data.data.user._id
        );
        const {
          apiSuccess: donorApplicationApiSuccess,
          apiError: donorApplicationApiError
        }: any = await getDonorApplicationByUserId(
          apiSuccess.data.data.user._id
        );

        if (donorApplicationApiSuccess) {
          // navigate("/welcome");
          // if (donorApplicationApiSuccess?.data?.data.length > 0) {
          //    navigate("/donor");
          // } else {
          //   navigate("/welcome");
          // }
          if (donorApplicationApiSuccess?.data?.data.length > 0) {
            const _application: any =
              donorApplicationApiSuccess?.data?.data[
                donorApplicationApiSuccess?.data?.data.length - 1
              ];

            await setDataToLocalStorage(
              "donorApplicationId",
              _application._id ?? ""
            );

            const _step: number = getStepCountOf(_application);
            setStep(_step);

            const { donor_information, medical_questionnaire } =
              _application?.application_status;

            if (donor_information === "pending") {
              // if (
              //   _application?.last_submission_question_section ===
              //   "QUESTIONNAIRE_ONE"
              // ) {
              //   navigate("/quick-setup/questionnaire");
              //   return;
              // }
              navigate("/quick-setup");
              return;
            } else if (medical_questionnaire === "pending") {
              if (
                _application?.last_submission_question_section ===
                "QUESTIONNAIRE_ONE"
              ) {
                navigate("/quick-setup/questionnaire");
                return;
              }
              if (
                _application?.last_submission_question_section ===
                "QUESTIONNAIRE_TWO"
              ) {
                navigate("/quick-setup/questionnaire-2");
                return;
              }
              navigate("/quick-setup/questionnaire");
            } else {
              navigate("/donor");
            }
          } else {
            navigate("/welcome");
          }
        } else if (donorApplicationApiError) {
          alert(
            "Error occured with retriving donor application. Please try again"
          );
        }
      } else if (otp === enteredOTP && role === "HEALTH") {
        await setDataToLocalStorage(
          "healthCareUserID",
          apiSuccess.data.data.user._id
        );
        navigate("/quick-setup/health-care-professional");
      } else {
        setMessage("Invalid OTP or User Role");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      {isError && (
        <Alert
          color="red"
          className="w-5/12 absolute flex justify-center top-10"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="flex flex-col items-center space-y-4 mt-[8%]">
        <LoginLogoIcon />
        <p className="text-base font-normal text-white flex gap-1">
          <span>{t("OTPSent")}</span>
          <span className="text-orange-550">{phoneNumber}</span>
        </p>
        <div className="flex flex-col space-y-6 items-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            containerStyle="flex space-x-5 justify-center items-center"
            inputStyle={{
              height: "50px",
              width: "60px",
              borderRadius: "10px",
              border: "2px solid #9A793D",
              outline: "none"
            }}
            renderSeparator={<span></span>}
            inputType="tel"
            renderInput={(props) => (
              <input
                {...props}
                onKeyPress={(event) => {
                  // Prevent non-numeric characters from being entered
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            )}
          />
          <p className="text-base font-normal text-white mt-6">
            {t("resend")} {""}
            {""}
            <span className="text-orange-550">
              {" "}
              {""}
              {t("resendReq")}
              {""}
            </span>
          </p>
        </div>
        <div className="flex gap-20 items-center">
          <div
            className="flex flex-row items-center gap-3 cursor-pointer"
            onClick={handleGoBack}
          >
            <GoBackIcon />
            <span className="text-base font-normal text-orange-550">
              Go Back
            </span>
          </div>
          <Button
            placeholder={"Verify"}
            disabled={isLoading}
            onClick={handleSubmit}
            className="rounded-[50px] flex justify-center bg-gradient-to-r  from-[#9A793D] to-[#DFC073] shadow-none w-[148px] text-base font-bold"
          >
            {isLoading ? <Spinner className="text-white" /> : t("verify")}
          </Button>
        </div>
      </div>
      <div>
        <Footer textColor="text-secondary" />
      </div>
    </div>
  );
};

export default Otp;
