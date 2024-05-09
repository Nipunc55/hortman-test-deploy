import { useEffect, useState } from "react";
import TextAreaInput from "../../../../atoms/admin/inputs/TextAreaInput";
import { getKitPickups } from "../../../../../api/kitStatus";
import { useParams } from "react-router-dom";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";

const CollectionDetailsModal = () => {
  const { name } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [appliucationKitPickupDetails, setApplicationKitPickupDetails] =
    useState<any>({
      application: {
        _id: ""
      },
      contact_person: "",
      contact_number: "",
      pickup_date_time: "",
      address: "",
      instructions: "",
      driver: {
        name: "",
        email: "",
        mobile_no: ""
      }
    });

  const getpickupDetails = async () => {
    const response = await getKitPickups(name ?? "");

    if (response.apiSuccess) {
      const apiSuccess = response.apiSuccess as any;
      setApplicationKitPickupDetails(apiSuccess?.data?.data);
    } else {
    }
    setLoading(false);
  };

  useEffect(() => {
    void getpickupDetails();
  }, []);
  if (isLoading) {
    return (
      <div className="mr-3">
        <LoaderIconSvg />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className=" text-sm font-normal text-black-500">
            Delivery Date & Time
          </span>
          <span className=" text-base font-normal text-black-500">
            {appliucationKitPickupDetails?.pickup_date_time}
          </span>
        </div>

        <div className="flex flex-col">
          <span className=" text-sm font-medium text-black-500">
            Assigned To
          </span>
          <span className=" text-sm font-normal text-black-500">
            {appliucationKitPickupDetails?.driver?.name}
          </span>
        </div>

        <div className="flex flex-col">
          <span className=" text-sm font-medium text-black-500">
            Donor Contact Person
          </span>
          <span className=" text-sm font-normal text-black-500">
            {appliucationKitPickupDetails?.contact_person}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-black-500">
            Contact Number
          </span>
          <span className=" text-sm font-normal text-black-500">
            {appliucationKitPickupDetails?.contact_number ?? ""}
          </span>
        </div>

        <div className="flex flex-col">
          <span className=" text-sm font-medium text-black-500">Address</span>
          <TextAreaInput
            name={"address"}
            value={appliucationKitPickupDetails?.address ?? ""}
            height=" h-11 "
            onChange={() => {}}
            label={""}
            placeholder={""}
          />
        </div>

        <div className="flex flex-col">
          <span className=" text-sm font-medium text-black-500">
            Instructions
          </span>
          <TextAreaInput
            name={"address"}
            value={appliucationKitPickupDetails?.instructions ?? ""}
            height=" h-11 "
            onChange={() => {}}
            label={""}
            placeholder={""}
          />
        </div>
      </div>
    </>
  );
};

export default CollectionDetailsModal;
