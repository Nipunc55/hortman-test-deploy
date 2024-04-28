import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Alert
} from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import DropDownList from "../../../atoms/admin/dropDownList/DropDownList";
import TextAreaInput from "../../../atoms/admin/inputs/TextAreaInput";
import { PopupFormSubmitButton } from "../../../atoms/admin/buttons/PopupButtons";
import { useState } from "react";
import { submitNofications } from "../../../../api/notifications";

interface ApplicationNotificationModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
  receiverId: string;
  applicationID?: string;
}

const ApplicationNotificationModal = ({
  open,
  handleOpen,
  receiverId,
  applicationID
}: ApplicationNotificationModalProps) => {
  const initialValues = {
    title: "Payment Reminder",
    body: "",
    notificationType: "",
    receiver: String(receiverId),
    application: String(applicationID)
  };

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, e) => {
      console.log(values);
      setIsLoading(true);
      setIsError(false);
      // void formik.setFieldValue("receiver", receiverId);

      const { apiSuccess, apiError }: any = await submitNofications(
        values.title,
        values.body,
        values.notificationType,
        values.receiver,
        values.application
      );

      setIsLoading(false);

      if (apiSuccess) {
        setIsLoading(false);
        resetForm(e);
        handleOpen(false);
      } else if (apiError) {
        setMessage(apiError.response.data.message);
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    },
    validateOnChange: false
  });

  const { values } = formik;

  const onRoleHandler = async (event: { value: string; label: string }) => {
    await formik.setFieldValue("notificationType", event.value);
  };
  const options = [{ value: "PAYMENT REMINDER", label: "Payment Reminder" }];

  const resetForm = (e: any) => {
    formik.handleReset(e);
  };

  console.log(typeof receiverId);

  return (
    <Dialog
      open={open}
      size={"xs"}
      handler={handleOpen}
      placeholder={""}
      className="rounded-[20px]"
    >
      <DialogHeader placeholder={""}>
        <div className="w-full flex justify-between items-center">
          <div className="text-5xl text-textPrimary font-medium">
            Send Notification
          </div>
          <IconButton
            placeholder={""}
            onClick={() => handleOpen(false)}
            className="bg-transparent outline-none shadow-none hover:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_8213_18063)">
                <path
                  d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                  stroke="#C8934F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 10L14 14M14 10L10 14"
                  stroke="#C8934F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_8213_18063">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </div>
      </DialogHeader>
      <hr className="border border-secondary" />
      {isError && (
        <div className="w-full flex justify-center items-center">
          <Alert color="red" className="w-11/12 p-2 mt-4">
            <span>{message}</span>
          </Alert>
        </div>
      )}
      <DialogBody placeholder={""} className="flex flex-col gap-6 mt-4">
        <DropDownList
          options={options}
          name="title"
          value={values.notificationType}
          // onSelect={() => {}}
          onChange={onRoleHandler}
          placeholder="Template"
        />

        <div className="mt-4">
          <span
            className={`font-normal normal-case text-black-500 text-sm w-full`}
          >
            Message
          </span>
          <TextAreaInput
            label=""
            name=""
            onChange={(e) => {
              void formik.setFieldValue("body", e.target.value);
            }}
            placeholder=""
            value={values.body}
            height=""
          />
        </div>
      </DialogBody>

      <DialogFooter placeholder={""} className="mb-4">
        <div className="w-full flex justify-end">
          <div
            className="flex"
            onClick={async () => {
              if (!isLoading) {
                await formik.setFieldValue("receiver", receiverId);
                await formik.setFieldValue("application", applicationID);
                await formik.submitForm();
              }
            }}
          >
            <PopupFormSubmitButton text={"Send"} isLoading={isLoading} />
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationNotificationModal;
