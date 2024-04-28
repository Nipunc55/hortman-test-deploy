import { useEffect, useState } from "react";
import EyeIcon from "../../../../assets/svg/eyeIcon";
import {
  DonorApplicationSecondarytableHeading,
  DonorApplicationSecondarytableHeadingWithIcon
} from "../../../molecules/admin/donorApplicationTable/tableHeaders/DonorApplication_Secondarytable";
import KitStatusModalController from "./KitStatusModalController";
import {
  getKitDispatchDetails,
  getKitPickups
} from "../../../../api/kitStatus";
import { useParams } from "react-router-dom";

const KitStatus = () => {
  const { name } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    | "uiKitDispatch"
    | "ucKitCollection"
    | "dispatchDetails"
    | "collectionDetails"
    | "receivedBy"
    | ""
  >("");
  const onClose = () => {
    setModalOpen(false);
    setModalType("");
  };

  const openModal = (type: string) => {
    setModalOpen(true);
    switch (type) {
      case "UC Kit Dispatch Details":
        setModalType("uiKitDispatch");
        break;
      case "UC Kit Collection Details":
        setModalType("ucKitCollection");
        break;
      case "Dispatch Detail":
        setModalType("dispatchDetails");
        break;
      case "Collection Detail":
        setModalType("collectionDetails");
        break;
      case "Received By":
        setModalType("receivedBy");
        break;
      default:
        break;
    }
  };

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

  const [appliucationKitPickupDetails, setApplicationKitPickupDetails] =
    useState<any>({
      application: {
        _id: ""
      },
      contact_person: "",
      pickup_date_time: "",
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
  };

  const getpickupDetails = async () => {
    const response = await getKitPickups(name ?? "");

    if (response.apiSuccess) {
      const apiSuccess = response.apiSuccess as any;
      setApplicationKitPickupDetails(apiSuccess?.data?.data);
    }
  };

  useEffect(() => {
    void getKitDispatchDetail();
    void getpickupDetails();
  }, []);

  return (
    <div className="px-6 pt-6 w-full min-h-screen ">
      <DonorApplicationSecondarytableHeadingWithIcon
        style="rounded-tl-lg rounded-tr-lg"
        ButtonHeading="Assign"
        TableHeading="UC Kit Dispatch Details"
        handleClick={openModal}
      />
      <div className="border border-secondary flex w-full text-black text-base font-medium capitalize px-6 pt-3 pb-1">
        <div className="flex-[1]">Date</div>
        <div className="flex-[0.5]">Assigned To</div>
        <div className="flex-[2]">Remarks</div>
      </div>
      <div className="border-x border-secondary flex w-full text-black text-base font-normal capitalize px-6 pt-3 pb-6">
        <div className="flex-[1]">
          {appliucationKitDispatchDetails?.delivery_date_time ?? ""}
        </div>
        <div className="flex-[0.5]">
          {appliucationKitDispatchDetails?.driver?.name ?? ""}
        </div>
        <div className="flex-[2]">
          <div
            className="flex justify-between items-center"
            onClick={() => openModal("Dispatch Detail")}
          >
            <span>{appliucationKitDispatchDetails?.instructions ?? ""}</span>
            <EyeIcon />
          </div>
        </div>
      </div>
      <DonorApplicationSecondarytableHeading TableHeading="UC Kit Dispatched Summary " />
      <div className="border-x border-secondary flex w-full text-black text-base font-normal capitalize px-6 pt-3 pb-6">
        <div className="flex w-full py-4">
          <div className="w-1/3 flex flex-col gap-2.5">
            <div>Kit Delivered Date </div>
            <div>Delivery Person</div>
            <div>Received By</div>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-2.5">
              <div className="">August 19, 2023 23:15:30</div>
              <div className="">Ibrar Ahmed</div>
              <div className="flex flex-col gap-1.5">
                <span className="">Mr. abdullah naim</span>
                <span className="">+971 50 1234567</span>
                <span>27V7+QC5 - Arabian Ranches - Alvorada - Dubai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DonorApplicationSecondarytableHeadingWithIcon
        ButtonHeading="Assign"
        TableHeading="UC Kit Collection Details"
        handleClick={openModal}
      />
      <div className="border border-secondary flex w-full text-black text-base font-medium capitalize px-6 pt-3 pb-1">
        <div className="flex-[1]">Date</div>
        <div className="flex-[0.5]">Assigned To</div>
        <div className="flex-[2]">Instructions</div>
      </div>
      <div className="border-x border-secondary flex w-full text-black text-base font-normal capitalize px-6 pt-3 pb-3">
        <div className="flex-[1]">
          {appliucationKitPickupDetails?.pickup_date_time}
        </div>
        <div className="flex-[0.5]">
          {appliucationKitPickupDetails?.driver?.name}
        </div>
        <div className="flex-[2]">
          <div
            className="flex justify-between items-center"
            onClick={() => openModal("Collection Detail")}
          >
            <span>{appliucationKitPickupDetails?.instructions ?? ""}</span>
            <EyeIcon />
          </div>
        </div>
      </div>
      <DonorApplicationSecondarytableHeading TableHeading="Actual kit Collection Date" />
      <div className="border-x border-secondary flex w-full text-black text-base font-normal capitalize px-6 pt-3 pb-6">
        <div className="flex w-full py-4">
          <div className="w-1/3 flex flex-col gap-2.5">
            <div>Received Date & Time</div>
            <div>Received By</div>
            <div>Remarks</div>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-2.5">
              <div className="font-medium">September 01, 2023 23:15:30</div>
              <div className="font-medium">Ibrar Ahmed</div>
              <div className="flex flex-col">
                <span className="font-medium">Mr. abdullah naim</span>
                <span className="font-medium">+971 50 1234567</span>
                <span>27V7+QC5 - Arabian Ranches - Alvorada - Dubai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-x border-y border-secondary flex w-full text-black text-base font-normal capitalize px-6 pt-3 pb-6">
        <div className="flex w-full py-4">
          <div className="w-1/3 flex flex-col gap-1.5">
            <div>Received Date & Time</div>
            <div>Received By</div>
            <div>Remarks</div>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1.5">
              <div>September 01, 2023 23:15:30</div>
              <div>Mr. Shahin</div>
              <div>Received by Shahin from Ibrar Ahmad </div>
            </div>
            <div>
              <button
                onClick={() => openModal("Received By")}
                className="w-full h-8 px-3.5 py-1 bg-primary rounded shadow justify-start items-center gap-1 inline-flex text-white hover:scale-95 cursor-pointer duration-1000"
              >
                Received By
              </button>
            </div>
          </div>
        </div>
      </div>
      <KitStatusModalController
        open={modalOpen}
        handleOpen={() => {}}
        modalType={modalType}
        handleClose={onClose}
      />
    </div>
  );
};

export default KitStatus;
