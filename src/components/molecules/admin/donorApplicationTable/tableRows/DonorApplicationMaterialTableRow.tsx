import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from "@material-tailwind/react";

import { useRef, useState } from "react";
import ApplicationRejectionModal from "../../modals/ApplicationRejectionModal";
// import ApplicationNotificationModal from "../../modals/ApplicationNotificationModal";
import { Link } from "react-router-dom";
import ActionButton from "../../../../atoms/admin/buttons/ActionButton";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";
import ApplicationNotificationModal from "../../modals/ApplicationNotificationModal";

const DonorApplicationTableRow = ({ data }: { data: any }) => {
  const [isRejectionModalOpen, setIsRejectionModalOpen] =
    useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    useState<boolean>(false);
  // const [selectedID, setSelectedID] = useState<string>("");
  const selectedID = useRef<string>("");
  const selectedApplicationId = useRef<string>("");

  const handleButtonClick = (item: string) => {
    // setSelectedID(item);
    selectedID.current = item;

    setIsNotificationModalOpen(true);
  };

  const handleButtonRejectedModalClick = (
    item: string,
    applicationId: string
  ) => {
    selectedID.current = item;
    selectedApplicationId.current = applicationId;
    setIsRejectionModalOpen(true);
  };

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString("en-US", options);
  };

  console.log(data);
  return (
    <div className="mb-5">
      {data?.length > 0 ? (
        <>
          {data.map((item: any) => (
            <div
              key={item._id}
              className={`pt-3.5 px-5 flex flex-row font-normal items-center`}
            >
              <div className="flex-[3] flex items-center">
                {getDateValue(item.created_at) ?? ""}
              </div>
              <div className="flex-[3] flex justify-start items-center gap-1">
                <span className="pl-1">{item?.package?.name ?? "N/A"}</span>
              </div>
              <div className="flex-[5] flex items-center pl-4">
                {item?.user?.name ?? "N/A"}
              </div>
              {/* <div className="flex-[5] flex items-center">
                {item?.user?.mobile_no ?? "N/A"}
              </div> */}
              <div className="flex-[3.5] flex items-center pl-1">
                {item?.user?.mobile_no ?? "N/A"}
              </div>
              <div className="flex-[2.5] flex items-center capitalize">
                <span>{item?.status?.toLowerCase() ?? ""}</span>
              </div>
              <div className="flex flex-[0.5]  items-center">
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <button className="outline-none">
                      <ActionButton
                        endIcon={<DropDownArrow />}
                        text={"Action"}
                        onclick={() => {}}
                        border="gold-gradient-action-button-border"
                      />
                    </button>
                  </MenuHandler>
                  <MenuList
                    className="flex flex-col pt-2 outline-none border border-grey-170 p-0"
                    placeholder={""}
                  >
                    <MenuItem
                      className="text-base text-black font-normal text-left"
                      placeholder={""}
                    >
                      <Link
                        to={`/admin/donor-applications/${item?._id}/${item?.user?._id}`}
                      >
                        <span className="px-1">Review Application</span>
                      </Link>
                    </MenuItem>
                    <hr className="border border-grey-170 w-full" />
                    <MenuItem
                      placeholder={""}
                      onClick={() => handleButtonClick(item?.user?._id)}
                      className="text-base text-black font-normal text-left"
                    >
                      <span className="px-1 !text-black-500">
                        Send Reminder / Notification
                      </span>
                    </MenuItem>
                    <hr className="border border-grey-170 w-full" />
                    <MenuItem
                      placeholder={""}
                      onClick={() =>
                        handleButtonRejectedModalClick(
                          item?.user?._id,
                          // item?.application_status?._id
                          item?._id
                        )
                      }
                      className="text-base text-red-650 focus:text-red-650 font-normal text-left"
                    >
                      <span className="px-1">Reject Application</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="w-full my-10 h-20">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              There are no data to be displayed
            </p>
          </div>
        </>
      )}
      <ApplicationRejectionModal
        applicationId={selectedApplicationId.current}
        receiverId={selectedID.current}
        open={isRejectionModalOpen}
        handleOpen={setIsRejectionModalOpen}
      />
      <ApplicationNotificationModal
        receiverId={selectedID.current}
        open={isNotificationModalOpen}
        handleOpen={setIsNotificationModalOpen}
      />
    </div>
  );
};

export default DonorApplicationTableRow;
