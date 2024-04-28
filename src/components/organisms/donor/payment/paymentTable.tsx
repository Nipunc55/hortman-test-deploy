import { useEffect, useState } from "react";
import { t } from "i18next";
import { TableTitle } from "../../../atoms/donor/typo";
import PaymentTableHeader from "../../../molecules/donor/payments/payment-table/TableHeader";
import PaymentTableRow from "../../../molecules/donor/payments/payment-table/TableRow";
import { createPayment, getMyPayments } from "../../../../api/payment";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import TablePagination from "../../../molecules/admin/pagination/TablePagination";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { getDonorApplicationByUserId } from "../../../../api/donor_application";

const PaymentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [packageData, setPackageData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getDonorPaymentsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getMyPayments();
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setPaymentData(apiSuccess.data.data);
      console.log(apiSuccess.data.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setTotalPages(apiSuccess.data.data.totalPages);
      setIsLoading(false);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      // setTimeout(() => {
      //   setIsError(false);
      // }, 3000);
    }
  };

  useEffect(() => {
    void getDonorPaymentsData();
  }, [searchTerm]);
  const getPackagedata = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any =
      await getDonorApplicationByUserId(userId);
    // setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setPackageData(apiSuccess?.data?.data[0]?.package);
      // console.log(apiSuccess?.data?.data[0]?.package);

      // setIsLoading(false);
    } else if (apiError) {
      console.log(apiError);
    }
  };

  useEffect(() => {
    void getPackagedata();
  }, []);
  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    console.log("paymentIntent", paymentIntent);

    if (paymentIntent && packageData) {
      toast.success("successfully created payment");
      void createPaymentInoice(paymentIntent);
    }
  }, [packageData]);
  const createPaymentInoice = async (paymentIntent: any) => {
    const { application } = {
      application: await getDataFromLocalStorage("donorApplicationId")
    };
    console.log(packageData);
    const { _id, price } = packageData;

    const { apiSuccess, apiError }: any = await createPayment(
      paymentIntent,
      application,
      price,
      "description",
      _id,
      "location"
    );
    if (apiSuccess?.status === 200) {
      toast.success("successfully updated invoice");
      setIsLoading(true);
      void getDonorPaymentsData();
    }
    if (apiError) {
      toast.error(apiError.message);
    }
  };
  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5 mb-16 min-h-[442px] ">
      {isError && (
        <Alert
          color="red"
          className="w-full container flex justify-center mt-10"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="pl-10 pb-5 border-b border-secondary">
        <TableTitle
          text={`${t("payments")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
      </div>
      <div className="w-full">
        <PaymentTableHeader InputCHange={onInputChange} Value={searchTerm} />
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="">
              <PaymentTableRow data={paymentData} />
            </div>
          </>
        )}
        <div className="">
          {totalPages > 1 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
