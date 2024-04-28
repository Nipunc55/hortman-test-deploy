import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";

import { useFormik } from "formik";

import ModalInputText from "../typo/ModalInputText";
import { applicationRejectionSchema } from "../../../../utils/validations";
import DropDownList from "../dropDownList/DropDownList";
import TextAreaInput from "../inputs/TextAreaInput";
import { PopupFormSubmitButton } from "../buttons/PopupButtons";

interface ApplicationRejectionModalProps {
  open: boolean;
  handleOpen: (value: boolean) => void;
}

const ApplicationRejectionModal = ({
  open,
  handleOpen
}: ApplicationRejectionModalProps) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef<any>(null);

  const initialValues = {
    rejectionBy: "",
    rejectionDate: "",
    rejectionReason: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: applicationRejectionSchema,
    validateOnChange: false
  });

  const { values, handleChange } = formik;

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    closeDatePicker();
  };

  // const openDatePicker = () => {
  //   if (datePickerRef.current) {
  //     datePickerRef.current.setOpen(true);
  //   }
  // };

  const closeDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  const onRejectByHandler = async (event: { value: string; label: string }) => {
    await formik.setFieldValue("rejectionBy", event.value);
  };
  return (
    <Dialog open={open} size={"xs"} handler={handleOpen} placeholder={""}>
      <DialogHeader
        className="text-5xl text-textPrimary font-medium"
        placeholder=""
      >
        Application Rejection
      </DialogHeader>
      <hr className="border border-secondary" />
      <DialogBody placeholder={""}>
        <DropDownList
          options={options}
          name="rejectionBy"
          value={values.rejectionBy}
          // onSelect={() => {}}
          onChange={onRejectByHandler}
          placeholder="Rejection By"
        />
        <div className="mt-4">
          <ModalInputText text={"Rejection Date"} />
        </div>
        <div className="flex w-full">
          <DatePicker
            ref={datePickerRef}
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            // onBlur={openDatePicker}
            placeholderText="DD/MM/YYYY"
            className="w-full h-10 px-3 mt-1 rounded-md outline-none"
            wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
          />
        </div>{" "}
        <div className="mt-4">
          <div className="mt-1">
            <TextAreaInput
              name={"rejectionReason"}
              value={values.rejectionReason}
              onChange={handleChange}
              label="Rejection Reason"
              placeholder="Type your reaction reason here..."
            />
          </div>
        </div>
      </DialogBody>

      <DialogFooter placeholder="">
        <PopupFormSubmitButton text={"Reject"} />
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationRejectionModal;
