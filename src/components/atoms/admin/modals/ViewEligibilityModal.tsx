import { Dialog, DialogHeader } from "@material-tailwind/react";
import RoundedCloseIcon from "../../../../assets/svg/RoundedCloseIcon";

const ViewEligibilityModal = ({
  open,
  handleOpen,
  handleClose,
  data
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  handleClose?: () => void;
  data: any;
}) => {
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString("en-US", options);
  };

  console.log(data);
  return (
    <>
      {data ? (
        <Dialog
          open={open}
          handler={handleOpen}
          placeholder={""}
          size={"sm"}
          className="rounded-[20px] "
        >
          <DialogHeader
            className="text-5xl text-textPrimary  border-b border-secondary font-medium flex flex-row justify-between"
            placeholder={""}
          >
            Application Status
            <div onClick={handleClose}>
              <RoundedCloseIcon />
            </div>
          </DialogHeader>
          <div className="text-black-500">
            <div className="px-5 pt-4 pb-[30px] flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <div className="text-xsxl font-medium">Date:</div>
                <div className="text-base font-normal">
                  {getDateValue(data?.created_at)}
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-xsxl font-medium">Reviewed By:</div>
                <div className="text-base font-normal">{data?.reviewer}</div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="text-xsxl font-medium">Status:</div>
                <div className="text-base font-normal">{data?.status}</div>
              </div>
              <div className="flex flex-col gap-2.5 ">
                <div className="text-xsxl font-medium">Message:</div>
                <div className="border border-secondary p-2.5 font-normal rounded-[5px] min-h-[60px] max-h-[60px]">
                  {data?.remark}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        // <div className="my-10 h-20 w-[676px]">
        //   {/* <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
        //     There are no data to be displayed
        //   </p> */}
        // </div>
        <></>
      )}
    </>
  );
};

export default ViewEligibilityModal;
