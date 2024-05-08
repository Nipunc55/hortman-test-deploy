import { useState } from "react";
import { PopupFormSubmitButton } from "../../../../atoms/admin/buttons/PopupButtons";
import DropDownList from "../../../../atoms/admin/dropDownList/DropDownList";
import TextAreaInput from "../../../../atoms/admin/inputs/TextAreaInput";

const ReviewdByModal = () => {
  const [selectedValue, setSelectedValue] = useState("ADMIN");
  const [remarks, setRemarks] = useState("");
  const options = [
    { value: "ADMIN", label: "Administrator" },
    { value: "DONOR", label: "Donor" },
    { value: "HEALTH", label: "Health care professional" },
    { value: "DRIVER", label: "Driver" }
  ];
  return (
    <div className="flex flex-col">
      <DropDownList
        options={options}
        name="role"
        value={options.filter((item) => item.value == selectedValue)[0]?.label}
        // onSelect={() => {}}
        onChange={(e) => {
          setSelectedValue(e.value);
        }}
        placeholder="Received By:"
      />
      <div className="pt-5">
        <TextAreaInput
          placeholder="Type your reasons here...."
          value={remarks}
          onChange={(e) => {
            setRemarks(e.value);
          }}
          name="comments"
          label="Remarks"
        />
      </div>
      <div className="w-full flex justify-end pt-8 pb-3">
        <div className="flex" onClick={() => {}}>
          <PopupFormSubmitButton text={"Submit"} isLoading={false} />
        </div>
      </div>
    </div>
  );
};

export default ReviewdByModal;
