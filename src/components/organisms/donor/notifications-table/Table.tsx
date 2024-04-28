import { useEffect, useState } from "react";
import TableHeader from "../../../molecules/donor/notificationTable/TableHeader";
import TableRow from "../../../molecules/donor/notificationTable/TableRow";
import { getNotifications } from "../../../../api/notifications";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase/config";

const Table = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any>(null);

  const getNotificationsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getNotifications("en");
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

  useEffect(() => {
    void getNotificationsData();
    onMessage(messaging, (payload: any) => {
      void getNotificationsData();
      // toast.success(payload?.notification?.title);
      console.log("message", payload);
    });
  }, []);

  return (
    <div className="my-5 ">
      <TableHeader />
      <div className="bg-white w-full rounded-b-xl shadow-lg min-h-[525px] max-h-[525px] overflow-auto">
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
          <div className="flex flex-col max-h-[470px]">
            <TableRow data={notificationsData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
