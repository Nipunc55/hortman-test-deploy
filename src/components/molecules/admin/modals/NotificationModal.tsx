/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Alert
} from "@material-tailwind/react";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import DropDownList from "../../../atoms/admin/dropDownList/DropDownList";
import { PopupFormSubmitButton } from "../../../atoms/admin/buttons/PopupButtons";
import TextAreaInput from "../../../atoms/admin/inputs/TextAreaInput";
import { submitNofications } from "../../../../api/notifications";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
// import { getPersonalDetailById } from "../../../../api/personal_detail";
import { getUserById } from "../../../../api/user";
import { useParams } from "react-router-dom";

import CloseIcon from "../../../../assets/svg/notificationIcon";
// import { status } from "../../../../types/userTypes";

interface NotificationsModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
}

const NotificationsModal = ({ open, handleOpen }: NotificationsModalProps) => {
  const { donorName } = useParams();
  const { name } = useParams();
  console.log(name);
  const getReceiverId = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any = await getUserById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      console.log(apiSuccess?.data?.data);
    } else if (apiError) {
      alert(apiError.response.data.message);
    }
  };

  useEffect(() => {
    void getReceiverId();
  }, []);

  const initialValues = {
    title: "Custom Notification",
    body: "",
    notificationType: "Custom Notification",
    receiver: donorName ?? "",
    language: "en",
    reviewedBy: undefined,
    application: name ?? ""
  };
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, e) => {
      setIsLoading(true);
      setIsError(false);

      const { apiSuccess, apiError }: any = await submitNofications(
        values.title,
        values.body,
        values.notificationType,
        values.receiver,
        values.language,
        values.reviewedBy,
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
    // validationSchema: userCreationSchema,
    validateOnChange: false
  });

  const resetForm = (e: any) => {
    formik.handleReset(e);
  };

  const { values } = formik;

  const options = [
    { value: "CUSTOM NOTIFICATION", label: "Custom Notification" }
  ];

  const onRoleHandler = async (event: { value: string; label: string }) => {
    await formik.setFieldValue("notificationType", event.value);
  };

  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any = await getUserById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data?.name);
      // const id = apiSuccess?.data?.data?._id;
      // void formik.setFieldValue("receiver", id);
    } else if (apiError) {
      console.log(apiError);

      // alert(apiError.response.data.message);
    }
  };

  useEffect(() => {
    void loadPersonalData();
  }, []);

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
            <CloseIcon />
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
            onClick={() => {
              if (!isLoading) {
                void formik.setFieldValue("language", "en");
                void formik.setFieldValue("application", name);
                void formik.submitForm();
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

export default NotificationsModal;
