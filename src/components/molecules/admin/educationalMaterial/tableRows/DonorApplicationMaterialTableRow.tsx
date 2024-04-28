import {
  Menu,
  MenuHandler
  // MenuItem,
  // MenuList
} from "@material-tailwind/react";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";
import { type singleDonorApplicationType } from "../../../../../types/DonorApplications";
import StatusBadges from "../../../../atoms/admin/badges/statusBadges";
import ActionButton from "../../../../atoms/admin/buttons/ActionButton";
// import { useState } from "react";
// import ApplicationRejectionModal from "../../modals/ApplicationRejectionModal";
// import ApplicationNotificationModal from "../../modals/ApplicationNotificationModal";

const DonorApplicationTableRow = ({
  data
}: {
  data: singleDonorApplicationType[];
}) => {
  // const [isRejectionModalOpen, setIsRejectionModalOpen] =
  //   useState<boolean>(false);
  // const [isNotificationModalOpen, setIsNotificationModalOpen] =
  //   useState<boolean>(false);
  return (
    <div className="mb-20">
      {data.map((item, index) => (
        <>
          <div
            key={index}
            className="pt-3.5 px-5 flex flex-row font-normal items-center"
          >
            <div className="flex-[1.5] flex items-center">
              {item?.date ?? ""}
            </div>
            <div className="flex-[2] flex justify-start items-center gap-1">
              <span>{item?.package ?? ""}</span>
            </div>
            <div className="flex-[4] flex items-center">
              {item?.donorName ?? ""}
            </div>
            <div className="flex-[1.7] flex items-center">
              <StatusBadges
                status={item?.status ?? ""}
                border="gold-gradient-action-button-border"
              />
            </div>
            <div className=" flex items-center">
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
                {/* <MenuList
                  placeholder={""}
                  className="flex flex-col pt-2 outline-none border border-grey-170 p-0"
                >
                  <MenuItem
                    placeholder={""}
                    className="text-base text-black font-normal text-left"
                  >
                    <span className="px-1">Review Application</span>
                  </MenuItem>
                  <hr className="border border-grey-170 w-full" />
                  <MenuItem
                    placeholder={""}
                    onClick={() => setIsNotificationModalOpen(true)}
                    className="text-base text-black font-normal text-left"
                  >
                    <span className="px-1">Send Reminder / Notification</span>
                  </MenuItem>
                  <hr className="border border-grey-170 w-full" />
                  <MenuItem
                    placeholder={""}
                    onClick={() => setIsRejectionModalOpen(true)}
                    className="text-base text-red-650 focus:text-red-650 font-normal text-left"
                  >
                    <span className="px-1">Reject Application</span>
                  </MenuItem>
                </MenuList> */}
              </Menu>
            </div>
          </div>
          {/* <ApplicationRejectionModal
            open={isRejectionModalOpen}
            handleOpen={setIsRejectionModalOpen}
          /> */}
          {/* Need to add reciever ID */}
          {/* <ApplicationNotificationModal
            receiverId=""
            open={isNotificationModalOpen}
            handleOpen={setIsNotificationModalOpen}
          /> */}
        </>
      ))}
    </div>
  );
};

export default DonorApplicationTableRow;
