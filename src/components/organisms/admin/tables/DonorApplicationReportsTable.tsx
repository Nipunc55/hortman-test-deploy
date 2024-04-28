import { useEffect, useState } from "react";
import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import DonorApplicationReportTableHeader from "../../../molecules/admin/donorApplicationAportTable/tableHeaders/donorApplicationReportTableHeader";
import DonorApplicationReportsTableRow from "../../../molecules/admin/donorApplicationAportTable/tableRows/DonorApplicationReportsTableRow";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { getDonorApplications } from "../../../../api/donor_application";
import TablePagination from "../../../molecules/admin/pagination/TablePagination";
import DownloadIconButton from "../../../../assets/svg/downloadIconButton";
import * as XLSX from "xlsx";

const DonorApplicationReportsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [reportsData, setReportsData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [donorName, setDonorName] = useState("");
  const [packageName, setPackageName] = useState<any>(undefined);
  const [toDate, setToDate] = useState<any>(null);
  const [fromDate, setFromDate] = useState<any>(null);
  const [filteredReportsData, setFilteredReportsData] = useState<any>(null);

  useEffect(() => {
    void getReportsData();
  }, [currentPage, searchTerm]);

  const getReportsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getDonorApplications(
      true,
      currentPage,
      10,
      donorName,
      packageName,
      toDate,
      fromDate
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setIsLoading(false);
      setReportsData(apiSuccess.data.data.docs);
      setTotalPages(apiSuccess.data.data.totalPages);
      console.log(apiSuccess.data.data.docs);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

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

    const filteredData = reportsData.filter((item: any) => {
      const matchesDonorName = !donorName || item?.user?.name;
      const matchesPackageName = !packageName || item?.package?.name;
      const matchesDateRange =
        (!formattedDateTo ||
          new Date(item.created_at) <= new Date(formattedDateTo)) &&
        (!formattedDateFrom ||
          new Date(item.created_at) >= new Date(formattedDateFrom));
      return matchesDonorName && matchesPackageName && matchesDateRange;
    });

    setFilteredReportsData(filteredData);
    void getReportsData();
    console.log(filteredReportsData + "filtered Data");
  };

  const handleDownload = () => {
    const getDateValue = (dateInput: string) => {
      const inputDate = new Date(dateInput);

      const options: any = {
        year: "numeric",
        month: "short",
        day: "numeric"
      };

      return inputDate.toLocaleDateString("en-US", options);
    };

    if (reportsData) {
      const formattedData = reportsData.map((item: any) => ({
        Date: getDateValue(item.created_at),
        Package: item?.package?.name,
        DonorName: item?.user?.name,
        Mobile: item?.user?.mobile_no,
        Email: item?.user?.email,
        Status: item?.status
      }));

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DonorApplicationsReport");
      XLSX.writeFile(wb, "DonorApplicationsReport.xlsx");
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  console.log(onInputChange);

  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5 mb-16 ">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="flex justify-between items-center mb-2 px-5">
        <TableTitle
          text={`${t("donor-applications-report")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
        {/* <SearchBar onChange={onInputChange} value={searchTerm} /> */}
      </div>
      <div className="">
        <DonorApplicationReportTableHeader
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
        <div className="flex flex-col justify-between">
          {isLoading ? (
            <div className="flex justify-center items-center my-10">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              <DonorApplicationReportsTableRow data={reportsData} />
            </>
          )}
          <div>
            <div className="flex mx-auto justify-center pt-8">
              <button
                className="flex gap-2 bg-secondary border border-textPrimary rounded-md py-1 px-3 hover:scale-95 duration-300"
                onClick={handleDownload}
              >
                <DownloadIconButton />
                <span className="text-primary text-base font-normal">
                  Download
                </span>
              </button>
            </div>
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

export default DonorApplicationReportsTable;
