import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Alert
} from "@material-tailwind/react";

import { useEffect, useRef, useState } from "react";

import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import { TableViewButton } from "../../../atoms/admin/buttons/TableButtons";
import EditButtonSvg from "../../../../assets/svg/EditButtonSvg";
import ApplicationRejectionModal from "../../../molecules/admin/modals/ApplicationRejectionModal";
import ApplicationNotificationModal from "../../../molecules/admin/modals/ApplicationNotificationModal";
import { getDonorApplications } from "../../../../api/donor_application";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { Link } from "react-router-dom";

const ApplicationStatusTable = () => {
  const [isRejectionModalOpen, setIsRejectionModalOpen] =
    useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  const TABLE_HEAD = [
    t("date"),
    t("hscl-ID"),
    t("package-name"),
    t("donor-name"),
    t("banking-type"),
    t("status"),
    t("action")
  ];
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [applicationData, setApplicationData] = useState<any>(null);
  const selectedID = useRef<string>("");

  const handleButtonClick = (item: string) => {
    // setSelectedID(item);
    selectedID.current = item;
    setIsNotificationModalOpen(true);
  };

  const handleButtonRejectedModalClick = (item: string) => {
    selectedID.current = item;
    setIsRejectionModalOpen(true);
  };

  useEffect(() => {
    void getDonorApplicationsData();
  }, []);

  const getDonorApplicationsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getDonorApplications(
      false,
      1,
      10
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      console.log(apiSuccess.data.data.docs);
      setIsLoading(false);
      setApplicationData(apiSuccess.data.data.docs);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
      // hour: "numeric",
      // minute: "numeric"
      /* second: "numeric",
      timeZoneName: "short" */
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="my-5">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="bg-white w-full p-5 rounded-xl shadow-lg z-10">
        <div className="flex justify-between items-center z-10 bg-white">
          <TableTitle text={`${t("application-status")}`} />
          <Link to={`/admin/donor-applications`}>
            <TableViewButton text={`${t("view-all")}`} />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center my-10">
            <LoaderIconSvg />
          </div>
        ) : (
          <div className="h-full w-full overflow-auto min-h-[276px] max-h-[276px] px-2 pb-2 related-articles-scrollbar">
            <table className="w-full min-w-max table-auto text-left">
              <thead className="">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-secondary pb-4 pt-4 sticky top-0 bg-white z-10"
                    >
                      <span className="font-medium text-base text-black">
                        {head}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="relative ">
                {applicationData?.length > 0 ? (
                  <>
                    {applicationData?.map((applicationDataItem: any) => (
                      <tr key={applicationDataItem._id} className=" pt-4">
                        <td className="py-2">
                          <span color="blue-gray" className="font-normal">
                            {getDateValue(applicationDataItem.created_at) ?? ""}
                          </span>
                        </td>
                        <td className="py-2">
                          <span color="blue-gray" className="font-normal">
                            {applicationDataItem.hscl_id ?? ""}
                          </span>
                        </td>
                        <td className="py-2">
                          <span color="blue-gray" className="font-normal">
                            {applicationDataItem.package?.name ?? "N/A"}
                          </span>
                        </td>
                        <td className="py-2">
                          <span color="blue-gray" className="font-normal">
                            {applicationDataItem.user?.name ?? "N/A"}
                          </span>
                        </td>
                        <td className="py-2">
                          <span color="blue-gray" className="font-normal">
                            {applicationDataItem.banking ?? "N/A"}
                          </span>
                        </td>
                        <td className="py-2">
                          <span
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {applicationDataItem.status.toLowerCase() ?? ""}
                          </span>
                        </td>
                        <td className="py-2 flex justify-center items-center">
                          <Menu placement="bottom-end">
                            <MenuHandler>
                              <button className="outline-none">
                                <EditButtonSvg />
                              </button>
                            </MenuHandler>
                            <MenuList
                              placeholder={""}
                              className="flex flex-col pt-2 outline-none border border-grey-170 p-0"
                            >
                              <MenuItem
                                className="text-base text-black font-normal text-left"
                                placeholder={""}
                              >
                                <Link
                                  to={`/admin/donor-applications/${applicationDataItem?._id}/${applicationDataItem?.user?._id}`}
                                >
                                  <span className="px-1">
                                    Review Application
                                  </span>
                                </Link>
                              </MenuItem>
                              <hr className="border border-grey-170 w-full" />
                              <MenuItem
                                placeholder={""}
                                onClick={() =>
                                  handleButtonClick(
                                    applicationDataItem?.user?._id
                                  )
                                }
                                className="text-base text-black font-normal text-left"
                              >
                                <span className="px-1">
                                  Send Reminder / Notification
                                </span>
                              </MenuItem>
                              <hr className="border border-grey-170 w-full" />
                              <MenuItem
                                placeholder={""}
                                onClick={() =>
                                  handleButtonRejectedModalClick(
                                    applicationDataItem?.user?._id
                                  )
                                }
                                className="text-base text-red-650 focus:text-red-650 font-normal text-left"
                              >
                                <span className="px-1">Reject Application</span>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div className="w-full my-10 h-20">
                    <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
                      There are no data to be displayed
                    </p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ApplicationRejectionModal
        receiverId={selectedID.current}
        open={isRejectionModalOpen}
        handleOpen={setIsRejectionModalOpen}
      />
      {/* need to add a reciever id */}
      <ApplicationNotificationModal
        receiverId={selectedID.current}
        open={isNotificationModalOpen}
        handleOpen={setIsNotificationModalOpen}
      />
    </div>
  );
};

export default ApplicationStatusTable;
