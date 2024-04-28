import { useParams } from "react-router-dom";
import StemCellInvoiceTableHeader from "../../../molecules/donor/stem-cell-packages-table/stemCellInvoiceTableHeader";
import StemCellInvoiceTableRow from "../../../molecules/donor/stem-cell-packages-table/stemCellInvoiceTableRow";
import { useEffect, useState } from "react";
import { getApplicationStatusByAplicationId } from "../../../../api/kitStatus";
import { getPackageById } from "../../../../api/package";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

type statusTypes = {
  donor_information: string;
  eligibility_assessment: string;
  kit_status: string;
  medical_questionnaire: string;
  payments: string;
  storage_certificate: string;
  umbilical_cord_unit_status: string;
};
const InvoiceTable = () => {
  const [status, setStatus] = useState<statusTypes>({
    donor_information: "pending",
    eligibility_assessment: "pending",
    kit_status: "pending",
    medical_questionnaire: "pending",
    payments: "pending",
    storage_certificate: "pending",
    umbilical_cord_unit_status: "pending"
  });
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    package_details: string;
    sub_heading: string;
    price: string;
    image: string;
    package_code: string;
    _id: string;
  }>({
    name: "",
    package_details: "",
    sub_heading: "",
    price: "",
    image: "",
    package_code: "",
    _id: ""
  });
  const [hsclid, setHsclid] = useState("");
  const { packageId } = useParams();
  const selectedPackageId = packageId ?? "";
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const getApplicationStatus = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiError, apiSuccess }: any =
      await getApplicationStatusByAplicationId(selectedPackageId);
    setIsLoading(false);
    if (apiSuccess?.data?.data) {
      console.log(apiSuccess?.data?.data);
      const statusData = apiSuccess?.data?.data[0];
      setHsclid(statusData?.application?.hscl_id);
      const x = {
        donor_information: statusData?.donor_information ?? "pending",
        eligibility_assessment: statusData?.eligibility_assessment ?? "pending",
        kit_status: statusData?.kit_status ?? "pending",
        medical_questionnaire: statusData?.medical_questionnaire ?? "pending",
        payments: statusData?.payments ?? "pending",
        storage_certificate: statusData?.storage_certificate ?? "pending",
        umbilical_cord_unit_status:
          statusData?.umbilical_cord_unit_status ?? "pending"
      };
      setStatus(x);

      const { apiError: packageError, apiSuccess: packageSuccess }: any =
        await getPackageById(statusData.application.package);
      if (packageSuccess) {
        setSelectedPackage(packageSuccess?.data?.data);
      } else if (packageError) {
        // alert(packageError);
      }
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
    void getApplicationStatus();
  }, []);

  return (
    <div className="my-5">
      <div className="bg-white w-full rounded-xl shadow-lg">
        {isError && (
          <Alert
            color="red"
            className="w-full container absolute flex justify-center top-40"
          >
            <span>{message}</span>
          </Alert>
        )}
        {isLoading ? (
          <div className="flex flex-col m-auto justify-center items-center my-10 min-h-[500px]">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <StemCellInvoiceTableHeader
              title={selectedPackage.name}
              image={selectedPackage.image}
              isLoading={isLoading}
            />
            <StemCellInvoiceTableRow hsclId={hsclid} status={status} />
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;
