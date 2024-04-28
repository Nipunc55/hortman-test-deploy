import ApplicationNotificationModal from "./ApplicationNotificationModal";

const NotificationModalSection = ({
  ID,
  handleOpen,
  open
}: {
  ID: string;
  handleOpen: (value: boolean) => void;
  open: boolean;
}) => {
  return (
    <div>
      <ApplicationNotificationModal
        receiverId={ID}
        open={open}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default NotificationModalSection;
