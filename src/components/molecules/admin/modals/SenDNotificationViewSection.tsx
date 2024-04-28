import SendNotificationViewModal from "../../../atoms/admin/modals/SendNotificationViewModal";

const SendNotificationViewSection = ({
  open,
  handleOpen,
  handleClose
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  handleClose: () => void;
}) => {
  return (
    <>
      <SendNotificationViewModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        data={[]}
      />
    </>
  );
};

export default SendNotificationViewSection;
