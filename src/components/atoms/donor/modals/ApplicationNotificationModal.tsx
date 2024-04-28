import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";

import { useFormik } from "formik";
import DropDownList from "../dropDownList/DropDownList";
import TextAreaInput from "../inputs/TextAreaInput";
import { PopupFormSubmitButton } from "../buttons/PopupButtons";

interface ApplicationNotificationModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
}

const ApplicationNotificationModal = ({
  open,
  handleOpen
}: ApplicationNotificationModalProps) => {
  const initialValues = {
    template: "",
    message: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false
  });

  const { values, handleChange } = formik;

  const onTemplateHandler = async (event: { value: string; label: string }) => {
    await formik.setFieldValue("template", event.value);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  return (
    <Dialog open={open} size={"xs"} handler={handleOpen} placeholder="">
      <DialogHeader
        className="text-5xl text-textPrimary font-medium"
        placeholder=""
      >
        Send Reminder/Notification
      </DialogHeader>
      <hr className="border border-secondary" />
      <DialogBody placeholder={""}>
        <DropDownList
          options={options}
          name="rejectionBy"
          value={values.template}
          // onSelect={() => {}}
          onChange={onTemplateHandler}
          placeholder="Notification by"
        />
        <div className="mt-4">
          <TextAreaInput
            name={"rejectionReason"}
            value={values.message}
            onChange={handleChange}
            label="Message"
            placeholder="Type your reaction reason here..."
          />
        </div>
      </DialogBody>

      <DialogFooter placeholder={""}>
        <PopupFormSubmitButton text={"Send"} />
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationNotificationModal;
