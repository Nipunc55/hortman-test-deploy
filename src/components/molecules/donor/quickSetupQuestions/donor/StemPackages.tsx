/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import { Alert, Button, IconButton } from "@material-tailwind/react";
import { t } from "i18next";
import i18n from "../../../../../i18n";
import { getPackages } from "../../../../../api/package";
import { getDataFromLocalStorage } from "../../../../../utils/common/accessLocalStorage";
import {
  updateApplicationByUser,
  updateApplicationStatusByUser
} from "../../../../../api/donor";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";
import dayjs from "dayjs";
import QuestionButtonIcon from "../../../../../assets/svg/QuestionButtonIcon";
import { ToastContainer, toast } from "react-toastify";

interface packageInterface {
  name: string;
  package_details: string;
  sub_heading: string;
  price: string;
  image: string;
  package_code: string;
  _id: string;
}
const StemPackages = ({ setStep }: { setStep: (step: number) => void }) => {
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
  const [packages, setPackages] = useState<packageInterface[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const handlePackageChange = async (value: string) => {
    setSelectedPackage(value);
    const donorApplicationId =
      await getDataFromLocalStorage("donorApplicationId");
    const payload = {
      package: value
    };
    console.log(selectedPackage);
    const { apiSuccess, apiError }: any = await updateApplicationByUser(
      payload,
      donorApplicationId
    );
    if (apiSuccess && apiSuccess.status === 200) {
      const currentDate = dayjs().format("MMMM DD, YYYY");
      const { apiError }: any = await updateApplicationStatusByUser(
        { type: "donor_information", date: currentDate },
        donorApplicationId
      );
      if (apiError) {
        toast.error(apiError.response.data.message);
      }
    } else if (apiError) {
      toast.error(apiError.response.data.message);
    }
  };

  const loadPackages = async () => {
    const { apiSuccess, apiError }: any = await getPackages();
    if (apiSuccess && apiSuccess.status === 200) {
      console.log(apiSuccess?.data?.data[0]);
      setPackages(apiSuccess?.data?.data);
      setIsLoading(false);
    } else if (apiError) {
      toast.error(apiError.message);
      setMessage(apiError.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void loadPackages();
  }, []);

  const handleButtonClick = () => {
    if (selectedPackage) {
      setStep(8);
    } else {
      toast.error("Please select a package before proceeding.");
    }
  };

  const handleBackButtonClick = () => {
    setStep(6);
  };

  return (
    <div className=" bg-white rounded-lg py-2.5 mt-4 min-w-[800px] min-h-[600px] mb-20 flex flex-col justify-between">
      <div className=" border-b-[1px] border-b-secondary pb-2.5">
        <span className=" text-primary text-5xl font-medium px-5">
          {t("stem-cell-packages")}
        </span>
      </div>
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="mt-2.5 px-5 w-[800px] min-h-[500px]">
        {isLoading ? (
          <div className="flex justify-center items-center my-10">
            <LoaderIconSvg />
          </div>
        ) : (
          <div className="flex overflow-hidden py-5">
            <div className="flex flex-row gap-8 pb-4 overflow-scroll ">
              {packages.map((item) => {
                return (
                  <div
                    className={`flex flex-col  items-center ${item._id === selectedPackage ? "selected-package" : ""}`}
                    key={item._id}
                  >
                    <img
                      src={item.image}
                      alt="Adore Hope"
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                    <div className="flex flex-col items-center mt-3.5 w-[300px]">
                      <span className=" text-2xl font-medium text-primary">
                        {item.name}
                      </span>
                      <span className=" text-[14px] h-10">
                        {item.sub_heading}
                      </span>
                    </div>

                    <div className=" my-3.5">
                      <Button
                        placeholder={""}
                        onClick={() => handlePackageChange(item._id)}
                        className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none w-[210px] text-base font-medium"
                      >
                        {t("choose-package")}
                      </Button>
                    </div>

                    <div className="flex p-2">
                      <span
                        className={`flex text-[14px] font-normal leading-5 ${
                          isArabic ? "text-right" : "text-justify"
                        }`}
                      >
                        {item.package_details}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
      <ToastContainer />
    </div>
  );
};

export default StemPackages;
