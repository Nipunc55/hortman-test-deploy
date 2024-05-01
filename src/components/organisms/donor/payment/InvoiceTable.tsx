import { useParams } from "react-router-dom";
import { t } from "i18next";
import { TableTitle } from "../../../atoms/donor/typo";
import InvoiceTableRow from "../../../molecules/donor/payments/invoiceTable/InvoiceTableRow";
import { useEffect, useState } from "react";
import { getPaymentsById } from "../../../../api/payment";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

// import { ToastContainer } from "react-toastify";

const InvoiceTable = () => {
  const { invoiceId } = useParams();
  const selectedInvoiceId = invoiceId ?? "";
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void getInvoiceDataByID();
  }, []);

  const getInvoiceDataByID = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any =
      await getPaymentsById(selectedInvoiceId);
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setPaymentDetails(apiSuccess.data.data);
      console.log(apiSuccess.data.data);
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

  return (
    <div className="my-5">
      <div className="bg-white w-full rounded-xl shadow-lg min-h-80">
        <div className="flex justify-between items-center p-5 ">
          <TableTitle
            text={`${t("invoice")}  ${invoiceId}`}
            textSize="text-6xl"
            color="text-textSecondary"
          />
        </div>
        {isError && (
          <Alert
            color="red"
            className="w-full container absolute flex justify-center top-40"
          >
            <span>{message}</span>
          </Alert>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center my-10">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="px-5">
              <InvoiceTableRow
                data={paymentDetails}
                selectedInvoiceId={selectedInvoiceId}
              />
            </div>
          </>
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default InvoiceTable;
