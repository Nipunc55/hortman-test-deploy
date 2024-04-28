import DropDownArrow from "../../../../../assets/svg/dropDownArrow";

const DonorApplicationTableHeader = () => {
  return (
    <div className="flex pt-6 pb-3 px-5 flex-row text-base font-medium  items-center justify-center border-y border-[#EFE8D8]">
      <div className="flex-[1.5]">Date</div>
      <div className="flex-[2] flex justify-start items-center gap-1">
        <span>Package</span>
        <DropDownArrow />
      </div>
      <div className="flex-[4] flex justify-start items-center gap-1">
        <span>Donor Name</span>
        <DropDownArrow />
      </div>
      <div className="flex-[1.7]">Status</div>
      <div className="flex-1">Action</div>
    </div>
  );
};

export default DonorApplicationTableHeader;
