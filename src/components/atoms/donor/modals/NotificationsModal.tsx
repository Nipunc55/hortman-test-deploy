import { Alert, Button, Dialog, DialogBody } from "@material-tailwind/react";
import ModalHeader from "../../../molecules/donor/notifications-modal/modalHeader";
import ModalRow from "../../../molecules/donor/notifications-modal/modalRow";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  getNotificationsRole,
  updateNotificationIsViewed
} from "../../../../api/notifications";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase/config";
// import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";

interface NotificationsModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
  setIsNotificationModalOpen?: (value: boolean) => void;
}

const NotificationsModal = ({
  open,
  handleOpen,
  setIsNotificationModalOpen
}: NotificationsModalProps) => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [role, setRole] = useState<any>(null);
  const [notificationsAdminData, setNotificationsAdminData] =
    useState<any>(null);

  const getNotificationsData = async () => {
    setIsLoading(true);
    setIsError(false);
    // const userId = await getDataFromLocalStorage("userId");
    const { apiSuccess, apiError }: any = await getNotificationsRole("en");
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setNotificationsAdminData(apiSuccess.data.data);

      const unviewedNotification: any = apiSuccess.data.data.find(
        (notification: any) => notification.is_viewed === false
      );

      if (unviewedNotification && setIsNotificationModalOpen) {
        setIsNotificationModalOpen(true);
      }

      setRole(apiSuccess.data?.data);
      console.log(role);

      console.log(apiSuccess.data.data);
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

  const updateNotificationsData = async () => {
    const { apiSuccess }: any = await updateNotificationIsViewed();
    if (apiSuccess && apiSuccess.status === 200) {
      if (setIsNotificationModalOpen) {
        setIsNotificationModalOpen(false);
      }
    }
  };

  useEffect(() => {
    void getNotificationsData();
    onMessage(messaging, (payload: any) => {
      void getNotificationsData();
      // toast.success(payload?.notification?.title);
      console.log("message", payload);
    });
  }, []);

  useEffect(() => {
    if (open) {
      void updateNotificationsData();
    }
  }, [open]);

  const handleClick = () => {
    navigate("/donor/notifications");
    handleOpen(false);
  };

  return (
    <div className="absolute right-10">
      <Dialog
        placeholder={""}
        open={open}
        size={"xs"}
        handler={handleOpen}
        className="absolute lg:right-10 top-16 xl:right-40"
      >
        <DialogBody className="p-0 " placeholder={""}>
          <ModalHeader />
          {isError && (
            <Alert
              color="red"
              className="w-full container absolute flex justify-center top-40"
            >
              <span>{message}</span>
            </Alert>
          )}
          {isLoading ? (
            <div className="flex flex-col m-auto justify-center items-center my-10">
              <LoaderIconSvg />
            </div>
          ) : (
            <div className="max-h-[347px] flex flex-col justify-between overflow-auto">
              <ModalRow data={notificationsAdminData} />
            </div>
          )}
          <div className="flex justify-center items-center">
            <Button
              onClick={handleClick}
              placeholder={""}
              className="text-[12px] text-black-500 font-semibold bg-[#EFE8D8] rounded-[5px] px-4 py-2.5 mb-5"
            >
              View All
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default NotificationsModal;
