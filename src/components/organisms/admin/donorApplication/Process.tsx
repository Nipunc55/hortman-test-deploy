import ReactDatePicker from "react-datepicker";
import { useRef, useState } from "react";

import { t } from "i18next";
import DropDownList from "../../../atoms/admin/dropDownList/DropDownList";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import InputField from "../../../atoms/admin/inputField/InputField";
import { TextareaDefault } from "../../../atoms/admin/textarea/textArea";

const Process = () => {
  const datePickerRef = useRef<any>(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    closeDatePicker();
  };

  const closeDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const options = [
    { value: "Ibrar Ahmed", label: "Ibrar Ahmed" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];

  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("Location");

  const [contactNumber, setContactNumber] = useState("Contact Number");

  return (
    <div className=" px-5 pt-7">
      <div className="border border-secondary rounded-t-lg">
        <div className="">
          <div className="bg-secondary rounded-t-lg px-6 py-2 text-xl font-medium">
            {t("kit-delivery-date")}
          </div>
          <div className="px-6 py-5 border-b border-secondary flex gap-6 items-center">
            <div className="min-w-[234px] ">
              <span className="text-base font-normal">
                {t("kit-release-date")}
              </span>
              <div className="flex mt-0.75 justify-between max-w-[234px] items-center bg-white full-width-datepicker-wrapper gold-gradient-input-border">
                <ReactDatePicker
                  ref={datePickerRef}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  onBlur={openDatePicker}
                  placeholderText="DD/MM/YYYY"
                  className="w-full h-10 px-3 mt-1 rounded-l-md outline-none max-w-[234px]"
                />
              </div>
            </div>
            <div className="min-w-[229px] ">
              <span className="text-base font-normal">{t("assigned-to")}</span>
              <DropDownList
                options={options}
                name="Assigned to"
                value={options[0].value}
                // onSelect={() => {}}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="py-4 px-4 flex justify-end">
          <BasicButton
            text={`${t("assigned")}`}
            onClick={() => {}}
            styledBorderEnabled={false}
          />
        </div>
        <div>
          <div className="bg-secondary  px-6 py-2 text-xl font-medium">
            {t("kit-delivered-date")}
          </div>
          <div className="flex py-5 px-5 flex-row items-start justify-start gap-12">
            <div className=" flex-col flex justify-start items-start gap-1">
              <span className="text-base font-normal">
                {t("kit-delivered-date")}
              </span>
              <span className="text-base font-medium">
                August 19, 2023 23:15:30
              </span>
            </div>
            <div className=" flex flex-col justify-start items-start gap-1">
              <span className="text-base font-normal">
                {t("delivery-person")}
              </span>
              <span className="text-base font-medium">Ibrar Ahmed</span>
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-base font-normal">{t("received-by")}</span>
              <span className="text-base font-medium">Mr. abdullah naim</span>
              <span className="text-base font-medium">+971 50 1234567</span>
              <span className="text-base font-medium">
                27V7+QC5 - Arabian Ranches - Alvorada - Dubai
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-secondary  px-6 py-2 text-xl font-medium">
            {t("estimated-kit-collection-date")}
          </div>
          <div className="px-6 py-5 border-b border-secondary flex flex-col gap-4">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="min-w-[234px] ">
                <span className="text-base font-normal">{t("dateNtime")}</span>
                <div className="flex mt-0.75 justify-between max-w-[234px] items-center bg-white full-width-datepicker-wrapper gold-gradient-input-border">
                  <ReactDatePicker
                    ref={datePickerRef}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    onBlur={openDatePicker}
                    placeholderText="DD/MM/YYYY"
                    className="w-full h-10 px-3 mt-1 rounded-l-md outline-none max-w-[234px] placeholder:text-[#808080]"
                  />
                </div>
              </div>
              <div className="min-w-[229px] ">
                <span className="text-base font-normal">
                  {t("assigned-to")}
                </span>
                <DropDownList
                  options={options}
                  name="Assigned to"
                  value={options[0].value}
                  // onSelect={() => {}}
                  onChange={() => {}}
                />
              </div>
              <div className="min-w-[229px] ">
                <span className="text-base font-normal">
                  {t("contact-person")}
                </span>
                <InputField
                  placeholder={"Contact Person"}
                  value={title}
                  onInputChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="min-w-[229px] ">
                <span className="text-base font-normal">
                  {t("contact-number")}
                </span>
                <InputField
                  placeholder={contactNumber}
                  value={contactNumber}
                  onInputChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="max-w-[500px]">
              <span className="text-base font-normal">
                {t("pickup-location")}
              </span>
              <TextareaDefault
                placeholder={location}
                value={location}
                onInputChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="py-4 px-4 flex justify-end">
          <BasicButton
            text={`${t("assigned")}`}
            onClick={() => {}}
            styledBorderEnabled={false}
          />
        </div>
        <div>
          <div className="bg-secondary  px-6 py-2 text-xl font-medium">
            {t("actual-kit-collection-date")}
          </div>
          <div className="flex py-5 px-5 flex-row items-start justify-start gap-12">
            <div className=" flex-col flex justify-start items-start gap-1">
              <span className="text-base font-normal">
                {t("kit-received-date")}
              </span>
              <span className="text-base font-medium">
                September 19, 2023 23:15:30
              </span>
            </div>
            <div className=" flex flex-col justify-start items-start gap-1">
              <span className="text-base font-normal">
                {t("pick-up-person")}
              </span>
              <span className="text-base font-medium">Ibrar Ahmed</span>
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-base font-normal">
                {t("collection-info")}
              </span>
              <span className="text-base font-medium">Mr. abdullah naim</span>
              <span className="text-base font-medium">+971 50 1234567</span>
              <span className="text-base font-medium">
                27V7+QC5 - Arabian Ranches - Alvorada - Dubai
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary">
          <div className="flex py-5 px-5 flex-row items-start justify-start gap-12">
            <div className="flex-[1] justify-start items-start gap-8 flex">
              <span className="text-base font-normal">
                {t("recieved-date")}
              </span>
              <span className="text-base font-medium">Mr. Shahin</span>
            </div>
            <div className=" flex-[2.7] justify-start items-start gap-6 flex">
              <span className="text-base font-normal">
                {t("recieved-date")}
              </span>
              <span className="text-base font-medium">
                September 01,2023 23:15:30
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center items-center flex pt-16 pb-4">
        <BasicButton
          onClick={() => {}}
          text={`${t("generate-certficate")}`}
          styledBorderEnabled={false}
        />
      </div>
    </div>
  );
};

export default Process;
