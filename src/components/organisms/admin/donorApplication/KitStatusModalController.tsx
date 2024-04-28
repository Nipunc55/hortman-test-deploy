import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import RoundedCloseIcon from "../../../../assets/svg/RoundedCloseIcon";
import KitDispatchModal from "./KitSummaryModals/KitDispatchModal";
import KitCollectModal from "./KitSummaryModals/KitCollectModal";
import DispatchDetailsModal from "./KitSummaryModals/DispatchDetailsModal";
import CollectionDetailsModal from "./KitSummaryModals/CollectionDetailsModal";
import ReviewdByModal from "./KitSummaryModals/ReviewdByModal";

const KitStatusModalController = ({
  open,
  handleOpen,
  modalType,
  handleClose
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  modalType: string;
  handleClose: () => void;
}) => {
  const renderModalTitle = () => {
    switch (modalType) {
      case "uiKitDispatch":
        return "UI Kit Dispatch";
      case "ucKitCollection":
        return "UC Kit Collection";
      case "dispatchDetails":
        return "Dispatch Detail";
      case "collectionDetails":
        return "Collection Detail";
      case "receivedBy":
        return "Received By";
      default:
        return "";
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={""}
        size={
          modalType === "uiKitDispatch" || modalType === "ucKitCollection"
            ? "md"
            : "xs"
        }
        className="rounded-t-[20px]"
      >
        <DialogHeader
          className="text-5xl text-textPrimary font-medium flex flex-row justify-between"
          placeholder={""}
        >
          {renderModalTitle()}
          <div onClick={handleClose}>
            <RoundedCloseIcon />
          </div>
        </DialogHeader>

        <hr className="border border-secondary" />

        <DialogBody placeholder={""}>
          {modalType === "uiKitDispatch" ? (
            <KitDispatchModal handleClose={handleClose} />
          ) : modalType === "ucKitCollection" ? (
            <KitCollectModal handleClose={handleClose} />
          ) : modalType === "dispatchDetails" ? (
            <DispatchDetailsModal />
          ) : modalType === "collectionDetails" ? (
            <CollectionDetailsModal />
          ) : modalType === "receivedBy" ? (
            <ReviewdByModal />
          ) : null}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default KitStatusModalController;
