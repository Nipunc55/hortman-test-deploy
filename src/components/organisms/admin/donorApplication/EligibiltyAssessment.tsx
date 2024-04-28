import { useEffect, useState } from "react";
import EyeIcon from "../../../../assets/svg/eyeIcon";
import { DonorApplicationSecondarytableHeadingWithIcon } from "../../../molecules/admin/donorApplicationTable/tableHeaders/DonorApplication_Secondarytable";
import NotificationsModal from "../../../molecules/admin/modals/NotificationModal";
import EligibilityModal from "../../../molecules/admin/modals/EligibiltyModal";
import {
  getElibilities,
  getNotificationsById
} from "../../../../api/notifications";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import SendNotificationViewModal from "../../../atoms/admin/modals/SendNotificationViewModal";
import ViewEligibilityModal from "../../../atoms/admin/modals/ViewEligibilityModal";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

const EligibiltyAssessment = () => {
  const applicationId = useParams();
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] =
    useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [isEligibilityError, setIsEligibilityError] = useState(false);
  const [isEligibilityLoading, setIsEligibilityLoading] = useState(true);
  const [eligibilitymessage, setEligibilityMessage] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [eligibilityData, setEligibilityData] = useState<any>(null);
  const userId = useParams();

  const getNotificationsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getNotificationsById(
      String(userId?.name),
      String(userId?.donorName)
    );
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setNotificationsData(apiSuccess.data.data);
      console.log(apiSuccess.data.data);
      console.log(notificationsData);
      setIsLoading(false);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getEligibilityData = async () => {
    setIsEligibilityLoading(true);
    setIsEligibilityError(false);
    const { apiSuccess, apiError }: any = await getElibilities(
      String(applicationId.name)
    );
    setIsEligibilityLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setEligibilityData(apiSuccess.data.data);
      setIsEligibilityLoading(false);
    } else if (apiError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setEligibilityMessage(apiError.response.data.message);
      setIsEligibilityError(true);
      setIsEligibilityLoading(false);
      setTimeout(() => {
        setIsEligibilityError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void getNotificationsData();
    void getEligibilityData();
  }, [isNotificationModalOpen, isEligibilityModalOpen]);

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [openEligibility, setOpenEligibility] = useState(false);
  const handleOpenEligibility = () => setOpenEligibility(!openEligibility);

  const handleButtonClick = (item: any) => {
    setSelectedNotification(item);
    handleOpen();
  };

  const handleEligibilityButtonClick = (item: any) => {
    setSelectedNotification(item);
    handleOpenEligibility();
  };

  return (
    <div className="px-6 pt-6 w-full max-h-screen ">
      <DonorApplicationSecondarytableHeadingWithIcon
        handleClick={() => {
          setIsNotificationModalOpen(true);
        }}
        style="rounded-tl-lg rounded-tr-lg"
        ButtonHeading="Send Notifications"
        TableHeading="Notifications"
      />
      <div className="border border-secondary flex w-full text-black text-base font-medium capitalize px-5 pt-3 pb-1">
        <div className="flex-[2]">Date</div>
        <div className="flex-[4]">Notifications</div>
        <div className="flex-[3]">Sender</div>
      </div>
      <div className="border-x border-secondary flex flex-col gap-2.5 w-full text-black text-base font-normal capitalize px-5 pt-4 pb-8 min-h-36">
        {isError && (
          <Alert
            color="red"
            className="w-full container flex justify-center mt-10"
          >
            <span>{message}</span>
          </Alert>
        )}
        {isLoading ? (
          <div className="my-10 w-full flex justify-center items-center">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full max-h-28 overflow-auto related-articles-scrollbar">
              {notificationsData.map((item: any) => (
                <div key={item._id} className="flex w-full px-2">
                  <div className="flex-[2]">
                    {getDateValue(item.created_at) ?? ""}
                  </div>
                  <div className="flex-[4]">
                    {item?.body.length > 50
                      ? `${item?.body.substring(0, 50)}....`
                      : item?.body ?? ""}
                  </div>
                  <div className="flex-[3]">
                    <div className="flex justify-between items-center">
                      <span>{item.sender.name}</span>
                      <div onClick={() => handleButtonClick(item)}>
                        <EyeIcon />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <DonorApplicationSecondarytableHeadingWithIcon
        handleClick={() => {
          setIsEligibilityModalOpen(true);
        }}
        ButtonHeading="Eligibility"
        TableHeading="Eligibility"
      />
      <div className="border border-secondary flex w-full text-black text-base  font-medium capitalize px-6 pt-3 pb-1">
        <div className="flex-[2] pr-6">Date</div>
        <div className="flex-[1.5] pr-6">Status</div>
        <div className="flex-[4] pr-6">Remarks</div>
        <div className="flex-[1.5] pr-6">Reviewed By</div>
      </div>
      <div className="border-x border-b mb-5  border-secondary flex flex-col gap-2.5 w-full text-black text-base font-normal capitalize px-5 pt-4 pb-8 min-h-36">
        {isEligibilityError && (
          <Alert
            color="red"
            className="w-full container flex justify-center mt-10"
          >
            <span>{eligibilitymessage}</span>
          </Alert>
        )}
        {isEligibilityLoading ? (
          <div className="my-10 w-full flex justify-center items-center">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full max-h-28 overflow-auto related-articles-scrollbar">
              {eligibilityData?.map((item: any) => (
                <div key={item._id} className="flex w-full px-2">
                  <div className="flex-[2]">
                    {getDateValue(item.created_at) ?? ""}
                  </div>
                  <div className="flex-[1.5]">
                    {item?.status === "Eligibility Acceptance" && "Accepted"}
                    {item?.status === "Eligibility Review" && "Review"}
                    {item?.status === "Eligibility Rejection" && "Rejection"}
                  </div>
                  <div className="flex-[4]">
                    <div className="flex justify-between items-center">
                      <span>
                        {item?.remark?.length > 40
                          ? `${item?.remark.substring(0, 40)}....`
                          : item?.remark ?? ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex-[1.5]">
                    <div className="flex justify-between items-center">
                      <span>
                        {item?.reviewer?.length > 10
                          ? `${item?.reviewer?.substring(0, 10)}....`
                          : item?.reviewer}
                      </span>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleEligibilityButtonClick(item);
                        }}
                      >
                        <EyeIcon />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <SendNotificationViewModal
        handleOpen={handleOpen}
        open={open}
        handleClose={handleOpen}
        data={selectedNotification}
      />
      <ViewEligibilityModal
        handleOpen={handleOpenEligibility}
        open={openEligibility}
        handleClose={handleOpenEligibility}
        data={selectedNotification}
      />
      <NotificationsModal
        open={isNotificationModalOpen}
        handleOpen={setIsNotificationModalOpen}
      />
      <EligibilityModal
        open={isEligibilityModalOpen}
        handleOpen={setIsEligibilityModalOpen}
      />
    </div>
  );
};

export default EligibiltyAssessment;
