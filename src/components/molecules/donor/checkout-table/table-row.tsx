import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { t } from "i18next";
import { CheckoutForm } from "../../../atoms/donor/forms/CheckoutForm";
import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { getDonorApplicationByUserId } from "../../../../api/donor_application";
import { ToastContainer } from "react-toastify";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const TableRow = () => {
  const options = {
    mode: "payment" as const,
    amount: 1099,
    currency: "usd",
    appearance: {
      /* ... */
    }
  };

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  // const [userId, setUserId] = useState<any>(null);

  const getPayementsById = async () => {
    console.log("");
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any =
      await getDonorApplicationByUserId(userId);
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setPaymentData(apiSuccess?.data?.data[0]?.package);
      // console.log(apiSuccess?.data?.data[0]?.package);

      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void getPayementsById();
  }, []);

  return (
    <div className="flex w-full">
      <div className="min-w-[60%] border-r border-secondary">
        {stripePromise && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm paymentData={paymentData} />
          </Elements>
        )}
      </div>
      {isError && (
        <div className="w-full flex justify-center items-center">
          <Alert color="red" className="w-11/12 p-2 mt-4">
            <span>{message}</span>
          </Alert>
        </div>
      )}
      <>
        {isLoading ? (
          <div className="my-10 w-full flex justify-center items-center">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="min-w-[40%] flex flex-col gap-3 p-10">
              <div className="flex justify-between w-full">
                <span className=" text-sm font-normal">
                  {t("package-name")}
                </span>
                <span className=" text-sm font-normal">{paymentData.name}</span>
              </div>
              <div className="flex text-inputText justify-between w-full">
                <span className=" text-sm font-normal">{t("subtotal")}</span>
                <span className=" text-sm font-normal">
                  {"US $"} {paymentData.price}
                </span>
              </div>
              <div className="flex text-inputText justify-between w-full">
                <span className=" text-sm font-normal">{t("taxes")}</span>
                <span className=" text-sm font-normal">0</span>
              </div>
              <div className="flex justify-between w-full">
                <span className=" text-sm font-normal">{t("total")}</span>
                <span className=" text-sm font-normal">
                  {"US $"} {paymentData.price}
                </span>
              </div>
            </div>
          </>
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default TableRow;
