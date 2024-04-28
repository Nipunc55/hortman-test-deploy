import { Button } from "@material-tailwind/react";

const QuestionButton = ({
  onClick,
  text,
  selected
}: {
  onClick: () => void;
  text: string;
  selected?: boolean;
}) => {
  return (
    <Button
      className={`${
        selected ? "bg-primary" : "bg-secondary"
      } h-10 flex justify-center items-center px-14 text-black font-normal text-base normal-case gold-gradient-input-border-select`}
      onClick={onClick}
      placeholder={""}
    >
      {text}
    </Button>
  );
};

export default QuestionButton;
