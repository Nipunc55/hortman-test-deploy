import { useParams } from "react-router-dom";
import InvoiceTableRow from "../../../molecules/admin/educationalMaterial/tableRows/InvoiceTableRow";
import { useEffect, useState } from "react";
import { getPaymentsById } from "../../../../api/payment";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { Alert } from "@material-tailwind/react";

const InvoiceTable = () => {
  const { invoiceId } = useParams();
  const selectedInvoiceId = invoiceId ?? "";
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
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
      setInvoice(apiSuccess.data.data.invoice);
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
                invoice={invoice}
                data={paymentDetails}
                selectedInvoiceId={selectedInvoiceId}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;
