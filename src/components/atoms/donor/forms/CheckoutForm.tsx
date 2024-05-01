/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { t } from "i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { checkoutStripe, createPayment } from "../../../../api/payment";
// import { getConfigurations } from "../../../../api/config";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { checkoutStripe, createPayment } from "../../../../api/payment";

import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
// import { getDonorApplicationByUserId } from "../../../../api/donor_application";

export const CheckoutForm = ({ paymentData }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  // let { payment_intent } = useParams();
  const [searchParams] = useSearchParams();

  // const [errorMessage, setErrorMessage] = useState("");
  // const [cardHolderInput, setCardHolderInput] = useState("");
  // const [cardNumberInput, setCardNumberInput] = useState("");
  // const navigate = useNavigate();
  // const backendUrl = import.meta.env.VITE_STRIPE_PK_AIRCODE_URL || "";
  // const backendUrl = "http://localhost:9001/api/v1";
  // const getPayementsById = async () => {
  //   console.log("");
  //   const userId = await getDataFromLocalStorage("userId");
  //   const { apiError, apiSuccess }: any =
  //     await getDonorApplicationByUserId(userId);
  //   // setIsLoading(false);
  //   if (apiSuccess && apiSuccess.status === 200) {
  //     setPaymentData(apiSuccess?.data?.data[0]?.package);
  //     // console.log(apiSuccess?.data?.data[0]?.package);

  //     // setIsLoading(false);
  //   } else if (apiError) {
  //     console.log(apiError);

  //     // setMessage(apiError.response.data.message);
  //     // setIsError(true);
  //     // setIsLoading(false);
  //     // setTimeout(() => {
  //     //   setIsError(false);
  //     // }, 3000);
  //   }
  // };

  // useEffect(() => {
  //   void getPayementsById();
  // }, []);

  const handleSubmit = async (event: any) => {
    const id = toast.loading("Proccesing the payment !");
    console.log("id", id);

    event.preventDefault();

    // if (elements == null || stripe == null) {
    //   return;
    // }
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
      setIsLoading(true);
      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();

      if (submitError?.message) {
        console.log(submitError);
        // toast;
        // Show error to your customer
        // setErrorMessage(submitError.message);
        return;
      }
      console.log(paymentData);

      // const headers = await getConfigurations();

      const amount = paymentData?.price * 100 || 0;
      // const amount = "1000";

      // Create the PaymentIntent and obtain clientSecret from your server endpoint
      // const res = await fetch(backendUrl + "/payments/checkout", {
      //   method: "POST",
      //   ...headers,
      //   body: JSON.stringify({
      //     currency: "usd",
      //     amount: 100
      //   })
      // });
      // const respond = await axios.post(
      //   `${backendUrl}/payments/checkout`,
      //   {
      //     currency: "usd",
      //     amount
      //   },
      //   headers
      // );

      const respond = await checkoutStripe({
        currency: "usd",
        amount
      });
      console.log(respond);

      // const res: any = await checkoutStripe();
      // console.log(res);

      // const res = await createPayment("application", 1000, "type", true);

      // console.log(respond);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { client_secret } = respond?.data?.data;
      // const stripeUrl = respond.data.session.url;
      // alert(client_secret);

      const { error } = await stripe.confirmPayment({
        // `Elements` instance that was used to create the Payment Element
        elements,
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/donor/payments`
        }
      });
      setIsLoading(false);
      if (error) {
        toast.update(id, {
          render: "error while creating payment!",
          type: "error",
          isLoading: false
        });
        console.log(error);
        toast.error(error?.message || "error adding data");

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        // setErrorMessage(error.message || "");
      } else {
        // toast.update(id, {
        //   render: "Payment successfully created",
        //   type: "success",
        //   isLoading: false
        // });
        // alert("payment donne");
        // await createPaymentInoice();
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error: any) {
      console.log(error);

      // toast.error(error?.message);
    }
  };

  // useEffect(() => {
  //   console.log("serach params");

  //   const paymentIntent = searchParams.get("payment_intent");

  //   if (paymentIntent && paymentData) {
  //     toast.success("successfully created payment");
  //     void createPaymentInoice(paymentIntent);
  //   }
  // }, [paymentData]);
  // const createPaymentInoice = async (paymentIntent: any) => {
  //   const { application } = {
  //     application: await getDataFromLocalStorage("donorApplicationId")
  //   };
  //   console.log(paymentData);
  //   const { _id, price } = paymentData;

  //   const { apiSuccess, apiError }: any = await createPayment(
  //     paymentIntent,
  //     application,
  //     price,
  //     "description",
  //     _id,
  //     "location"
  //   );
  //   if (apiSuccess?.status === 200) {
  //     toast.success("successfully updated invoice");
  //     // handleRoute();
  //   }
  //   if (apiError) {
  //     toast.error(apiError.message);
  //   }
  // };

  // const handleRoute = () => {
  //   navigate("/donor/payments");
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-10 ">
        {/* <div className="flex flex-col gap-8">
        <div className="">
          <span
            className={`font-normal normal-case text-black-500 text-sm w-full  flex `}
          >
            {t("card-holder")}
          </span>
          <div className="gold-gradient-input-border-select mt-0.75">
            <input
              className={`border-none p-2.5 w-full outline-none placeholder:text-[#959DAD] text-[14px]`}
              placeholder={"Card holder"}
              type="text"
              onChange={(e) => setCardHolderInput(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <span
            className={`font-normal normal-case text-black-500 text-sm w-full  flex `}
          >
            {t("credit/debit")}
          </span>
          <div className="gold-gradient-input-border-select mt-0.75">
            <input
              className={`border-none p-2.5 w-full outline-none placeholder:text-[#959DAD] text-[14px]`}
              placeholder={"4224 4224 4224 4224"}
              type="text"
              onChange={(e) => setCardNumberInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="w-full">
            <span
              className={`font-normal normal-case text-black-500 text-sm w-full  flex `}
            >
              {t("expiry")}
            </span>
            <div className="gold-gradient-input-border-select mt-0.75">
              <input
                className={`border-none p-2.5 w-full outline-none placeholder:text-[#959DAD] text-[14px]`}
                placeholder={"MM/YY"}
                type="text"
                onChange={(e) => setCardHolderInput(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <span
              className={`font-normal normal-case text-black-500 text-sm w-full  flex `}
            >
              {t("cvv")}
            </span>
            <div className="gold-gradient-input-border-select mt-0.75">
              <input
                className={`border-none p-2.5 w-full outline-none placeholder:text-[#959DAD] text-[14px]`}
                placeholder={"123"}
                type="text"
                onChange={(e) => setCardNumberInput(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="payment-button-bg my-12 mx-auto"
        >
          {t("pay-now")}
        </button>

        {errorMessage && <div>{errorMessage}</div>}
      </div> */}
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="payment-button-bg my-12 mx-auto"
        >
          {isLoading ? t("Loading...") : t("pay-now")}
        </button>
        {/* Show error message to your customers */}
        {/* {errorMessage && <div>{errorMessage}</div>} */}
      </form>
      <ToastContainer />
    </>
  );
};
