import React, { useEffect, useState } from "react";
import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import PaymentTableHeader from "../../../molecules/admin/educationalMaterial/tableHeaders/PaymentTableHeader";
import PaymentTableRow from "../../../molecules/admin/payments/tableRows/PaymentTablerow";
import { getPayments } from "../../../../api/payment";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import TablePagination from "../../../molecules/admin/pagination/TablePagination";

const PaymentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [donorName, setDonorName] = useState("");
  const [packageName, setPackageName] = useState<any>(undefined);
  const [toDate, setToDate] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);
  const [filteredReportsData, setFilteredReportsData] = useState<any>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getDonorPaymentsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getPayments(
      false,
      currentPage,
      10,
      donorName,
      packageName,
      toDate,
      fromDate
    );

    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setPaymentData(apiSuccess.data.data.docs);
      console.log(apiSuccess.data.data.docs);
      setTotalPages(apiSuccess.data.data.totalPages);
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

  console.log(onInputChange);

  useEffect(() => {
    void getDonorPaymentsData();
  }, [searchTerm, currentPage]);

  const filterSearch = () => {
    let formattedDateTo: any;
    let formattedDateFrom: any;

    // Format the date as "YYYY-MM-DD"
    if (toDate) {
      formattedDateTo = `${toDate.getFullYear()}-${(toDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${toDate.getDate().toString().padStart(2, "0")}`;
    }

    if (fromDate) {
      formattedDateFrom = `${fromDate.getFullYear()}-${(fromDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fromDate.getDate().toString().padStart(2, "0")}`;
    }

    setDonorName(donorName);
    setPackageName(packageName);

    // const filteredData = paymentData.filter((item: any) => {
    //   const matchesDonorName = !donorName || item?.user?.name;
    //   const matchesPackageName = !packageName || item?.package?.name;
    //   const matchesDateRange =
    //     (!formattedDateTo ||
    //       new Date(item.created_at) <= new Date(formattedDateTo)) &&
    //     (!formattedDateFrom ||
    //       new Date(item.created_at) >= new Date(formattedDateFrom));
    //   return matchesDonorName && matchesPackageName && matchesDateRange;
    // });

    const filteredData = paymentData.filter((item: any) => {
      const matchesDonorName =
        !donorName || item?.user?.name.includes(donorName);
      const matchesPackageName =
        packageName === undefined ||
        item?.package?.name.toLowerCase() === packageName.toLowerCase();
      const matchesDateRange =
        (!formattedDateTo ||
          new Date(item.created_at) <= new Date(formattedDateTo)) &&
        (!formattedDateFrom ||
          new Date(item.created_at) >= new Date(formattedDateFrom));
      return matchesDonorName && matchesPackageName && matchesDateRange;
    });

    setFilteredReportsData(filteredData);
    void getDonorPaymentsData();
    console.log(filteredReportsData + "filtered Data");
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
      <div className="flex justify-between items-center mb-2 px-5">
        <TableTitle
          text={t("payments")}
          textSize="text-6xl"
          color="text-textSecondary"
        />
      </div>
      <div className="flex flex-col justify-between">
        <PaymentTableHeader
          donorName={donorName}
          packageName={packageName}
          toDate={toDate}
          fromDate={fromDate}
          setDonorName={setDonorName}
          setPackageName={setPackageName}
          setToDate={setToDate}
          setFromDate={setFromDate}
          filterSearch={filterSearch}
        />
        <div className=" flex flex-col justify-between min-h-[200px] ">
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
          <div>
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
    </div>
  );
};

export default PaymentTable;
