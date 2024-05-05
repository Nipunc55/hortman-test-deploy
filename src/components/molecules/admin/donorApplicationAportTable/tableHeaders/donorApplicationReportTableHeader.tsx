import { useRef } from "react";
import DatePicker from "react-datepicker";
import { t } from "i18next";
import InputField from "../../../../atoms/admin/inputField/InputField";
import DropDownList from "../../../../atoms/admin/dropDownList/DropDownList";
import SearchMiniButton from "../../../../atoms/admin/buttons/SearchMiniButton";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";
import DateIcon from "../../../../../assets/svg/DateIcon";

const DonorApplicationReportTableHeader = ({
  donorName,
  packageName,
  toDate,
  fromDate,
  setDonorName,
  setPackageName,
  setToDate,
  setFromDate,
  filterSearch
}: {
  donorName: string;
  packageName: string;
  toDate: any;
  fromDate: any;
  setDonorName: (value: any) => void;
  setPackageName: (value: any) => void;
  setToDate: (value: any) => void;
  setFromDate: (value: any) => void;
  filterSearch: () => void;
}) => {
  const options = [
    { value: undefined, label: "All" },
    { value: "Treasure Hope", label: "Treasure Hope" },
    { value: "Adore Hope", label: "Adore Hope" },
    { value: "Aspire Hope", label: "Aspire Hope" },
    { value: "Sustained Hope", label: "Sustained Hope" }
  ];
  const datePickerRef = useRef<any>(null);
  const datePickerRefFrom = useRef<any>(null);
  const handleDateChange = (date: any) => {
    setToDate(date);
    closeDatePicker();
  };

  const handleDateChangeFrom = (date: any) => {
    setFromDate(date);
    closeDatePickerFrom();
  };

  const closeDatePickerFrom = () => {
    if (datePickerRefFrom.current) {
      datePickerRefFrom.current.setOpen(false);
    }
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

  const openDatePickerFrom = () => {
    if (datePickerRefFrom.current) {
      datePickerRefFrom.current.setOpen(true);
    }
  };

  const onPackageNameHandler = async (event: {
    value: string;
    label: string;
  }) => {
    setPackageName(event.value);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex gap-5 pt-6 pb-3 px-5 flex-row text-base font-medium  items-center justify-center border-t border-[#EFE8D8]">
        <div className="flex flex-col gap-1 w-full">
          <div>{t("donor-name")}</div>
          <div>
            <InputField
              placeholder="Donor Name"
              label=""
              onInputChange={(e) => setDonorName(e.target.value)}
              value={donorName}
              styles={{ width: "100%", height: "40px" }}
              key={"key"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full max-w-[180px]">
          <div>{t("Package")}</div>
          <div className="">
            <DropDownList
              options={options}
              name="catergory"
              value={packageName === undefined ? "All" : packageName}
              // onSelect={() => {}}
              onChange={onPackageNameHandler}
            />
          </div>
        </div>
        <div className="flex flex-col w-9/12">
          <div className="">{t("to")}</div>
          <div className="w-full relative flex mt-0.75 justify-between items-center">
            <DatePicker
              ref={datePickerRef}
              onChange={handleDateChange}
              selected={toDate}
              dateFormat="dd/MM/yyyy"
              // onBlur={openDatePicker}
              placeholderText="DD/MM/YYYY"
              className="w-full h-10 px-3 mt-1 rounded-md outline-none"
              wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
            />
            <div
              onClick={openDatePicker}
              // onBlur={openDatePicker}
              className="absolute top-2 right-2.5 cursor-pointer"
            >
              <DateIcon />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-9/12">
          <div className="">{t("from")}</div>
          <div className="w-full relative flex mt-0.75 justify-between items-center">
            <DatePicker
              ref={datePickerRefFrom}
              selected={fromDate}
              onChange={handleDateChangeFrom}
              dateFormat="dd/MM/yyyy"
              // onBlur={openDatePickerFrom}
              placeholderText="DD/MM/YYYY"
              className="w-full h-10 px-3 mt-1 rounded-md outline-none"
              wrapperClassName="full-width-datepicker-wrapper gold-gradient-input-border"
            />
            <div
              onClick={openDatePickerFrom}
              onBlur={openDatePickerFrom}
              className="absolute top-2 right-2.5 cursor-pointer"
            >
              <DateIcon />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <SearchMiniButton
            onClick={() => {
              filterSearch();
            }}
          />
        </div>
      </div>
      <div className="flex pb-3 px-5 text-base font-medium  items-center  border-b border-[#EFE8D8]">
        <div className="flex-[1] ">{t("date")}</div>
        <div className="flex-[1.3] flex  items-center gap-1">
          <span>{t("package")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[1.5] flex  items-center gap-1">
          <span>{t("donor-name")}</span>
          <DropDownArrow />
        </div>
        <div className="flex-[1]">{t("mobile")}</div>
        <div className="flex-[1]">{t("email")}</div>
        <div className="flex-[0.7]">{t("status")}</div>
      </div>
    </div>
  );
};

export default DonorApplicationReportTableHeader;
