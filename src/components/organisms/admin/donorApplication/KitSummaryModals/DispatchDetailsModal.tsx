import { useEffect, useState } from "react";
import TextAreaInput from "../../../../atoms/admin/inputs/TextAreaInput";
import { getKitDispatchDetails } from "../../../../../api/kitStatus";
import { useParams } from "react-router-dom";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";

const DispatchDetailsModal = () => {
  const { name } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [appliucationKitDispatchDetails, setApplicationKitDispatchDetails] =
    useState<any>({
      application: {
        _id: ""
      },
      contact_person: "",
      delivery_date_time: "",
      instructions: "",
      driver: {
        name: "",
        email: "",
        mobile_no: ""
      }
    });

  const getKitDispatchDetail = async () => {
    const response = await getKitDispatchDetails(name ?? "");

    if (response.apiSuccess) {
      const apiSuccess = response.apiSuccess as any;
      setApplicationKitDispatchDetails(apiSuccess?.data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    void getKitDispatchDetail();
  }, []);
  if (isLoading) {
    return (
      <div className="mr-3">
        <LoaderIconSvg />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className=" text-sm font-normal text-black-500">
          Delivery Date & Time
        </span>
        <span className=" text-base font-normal text-black-500">
          {appliucationKitDispatchDetails?.delivery_date_time ?? ""}
        </span>
      </div>

      <div className="flex flex-col">
        <span className=" text-sm font-medium text-black-500">Assigned To</span>
        <span className=" text-sm font-normal text-black-500">
          {appliucationKitDispatchDetails?.driver?.name ?? ""}
        </span>
      </div>

      <div className="flex flex-col">
        <span className=" text-sm font-medium text-black-500">Remarks</span>
        <TextAreaInput
          name={"address"}
          value={appliucationKitDispatchDetails?.instructions ?? ""}
          height="h-27"
          onChange={() => {}}
          label={""}
          placeholder={""}
        />
      </div>
    </div>
  );
};

export default DispatchDetailsModal;
