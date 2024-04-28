import { Button } from "@material-tailwind/react";
import DropDownArrow from "../../../../assets/svg/dropDownArrow";

interface TableViewButtonProps {
  text: string;
}

interface TableActionsProps {
  text: string;
}

const TableViewButton = ({ text }: TableViewButtonProps) => {
  return (
    <Button
      placeholder={""}
      className="text-black normal-case font-normal overflow-hidden text-sm bg-secondary py-1.5 px-7 rounded-3xl gold-gradient-border"
    >
      {text}
    </Button>
  );
};

const TableActionsButton = ({ text }: TableActionsProps) => {
  return (
    <div className="flex items-center justify-center bg-secondary gap-2 text-center text-black normal-case font-normal overflow-hidden text-sm  py-1.5 px-7 rounded-3xl gold-gradient-border w-[108px]">
      <span>{text}</span>
      <DropDownArrow />
    </div>
  );
};

export { TableViewButton, TableActionsButton };
