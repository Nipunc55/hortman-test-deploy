import { Alert, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getPaymentsByApplicationId } from "../../../../api/payment";
import { useParams } from "react-router-dom";
import ApplicationNotificationModal from "../modals/ApplicationNotificationModal";
import { t } from "i18next";

const DonorApplicationPaymentTableRow = () => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>([]);
  const name = useParams();

  console.log(name.name);

  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);

  const getPaymentData = async () => {
    if (name.name) {
      const response = await getPaymentsByApplicationId(name.name);
      setIsLoading(false);
      if (response.apiSuccess) {
        const apiSuccess = response.apiSuccess as any;

        setPaymentData(apiSuccess?.data?.data);
        console.log(apiSuccess?.data?.data);
        setIsLoading(false);
      } else if (response.apiError) {
        const apiError = response.apiError as any;
        setMessage(apiError.response.data.message);
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    void getPaymentData();
  }, [name.name]);

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  const handleButtonClick = () => {
    // setSelectedID(item);

    setIsNotificationModalOpen(true);
  };

  console.log(typeof name.donorName);

  return (
    <>
      <>
        {isError && (
          <Alert
            color="red"
            className="w-full container absolute flex justify-center top-40"
          >
            <span>{message}</span>
          </Alert>
        )}

        {isLoading ? (
          <>
            <div className="flex justify-center items-center h-96">
              No Data Found
            </div>
          </>
        ) : (
          <>
            {paymentData.length > 0 &&
              paymentData.map((data: any) => (
                <div className="py-4 pl-6 flex flex-row font-normal text-base">
                  <div className="flex-[2] flex items-center">
                    {getDateValue(data?.created_at)}
                  </div>
                  <div className="flex-[2] flex items-center ">
                    {data?.package?.name}
                  </div>
                  <div className="flex-[2] flex items-center ">
                    {data?.user?.email}
                  </div>
                  <div className="flex-[2] flex items-center ">
                    {data?.type}
                  </div>
                  <div className="flex-[2] flex items-center font-medium  ">
                    {t("$")}
                    {data?.amount}
                  </div>
                  <div className="flex-[2] flex items-center  gap-2 ">
                    <span>{data?.status}</span>
                  </div>
                  <div className="flex-[2.4] flex items-center  gap-2 ">
                    {/*  <Button
                      placeholder={""}
                      onClick={handleButtonClick}
                      className="payment-request-button text-black-500 text-sm font-normal max-h-[30px] flex items-center text-center capitalize"
                    >
                      Payment Request
                    </Button>*/}
                  </div>
                </div>
              ))}
          </>
        )}
      </>
      <ApplicationNotificationModal
        receiverId={name.donorName || ""}
        applicationID={name.name || ""}
        open={isNotificationModalOpen}
        handleOpen={setIsNotificationModalOpen}
      />
    </>
  );
};

export default DonorApplicationPaymentTableRow;
