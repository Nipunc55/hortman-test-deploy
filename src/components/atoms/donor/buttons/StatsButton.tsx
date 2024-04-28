import { Button } from "@material-tailwind/react";

interface StatusButtonProps {
  text: string;
  onClick: () => void;
}

const StatsButton = ({ text, onClick }: StatusButtonProps) => {
  return (
    <Button placeholder={""} className="StatusButton" onClick={onClick}>
      {text}
    </Button>
  );
};

export default StatsButton;
