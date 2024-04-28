import { Button } from "@material-tailwind/react";

interface PopupFormSubmitButtonProps {
  text: string;
}

const PopupFormSubmitButton = ({ text }: PopupFormSubmitButtonProps) => {
  return (
    <Button
      placeholder={""}
      className="text-black-500 normal-case py-2 font-normal text-base bg-secondary px-10 gold-gradient-input-border-select"
    >
      {text}
    </Button>
  );
};

export { PopupFormSubmitButton };
