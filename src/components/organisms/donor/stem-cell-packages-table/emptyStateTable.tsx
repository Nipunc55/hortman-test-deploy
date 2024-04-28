import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import NothingIcon from "../../../../assets/svg/nothingIcon";

const EmptyStateTable = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/quick-setup/donor");
  };
  return (
    <div className="my-5 flex items-center justify-center">
      <div className="bg-white w-full rounded-xl shadow-lg min-h-[525px] flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center ">
          <NothingIcon />
          <div className="text-center flex flex-col">
            <span className="text-primary text-5xl font-normal">
              Nothing to show
            </span>
            <span className="text-xsxl font-normal">
              Click to button below to add new record
            </span>
          </div>
          <Button
            placeholder={""}
            onClick={handleSubmit}
            className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-base font-bold"
          >
            Apply for Cell Storage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyStateTable;
