import { Button } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

interface PopupFormSubmitButtonProps {
  text: string;
  isLoading?: boolean;
}

const PopupFormSubmitButton = ({
  text,
  isLoading
}: PopupFormSubmitButtonProps) => {
  return (
    <Button
      placeholder={""}
      className="text-black-500 normal-case py-2 font-normal text-base bg-secondary px-10 gold-gradient-input-border-select flex space-x-2"
    >
      {isLoading !== null && isLoading && <LoaderIconSvg />}
      {text}
    </Button>
  );
};

export { PopupFormSubmitButton };
