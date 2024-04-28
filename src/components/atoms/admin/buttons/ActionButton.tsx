import React from "react";

const ActionButton = ({
  text,
  onclick,
  endIcon,
  border
}: {
  text: string;
  onclick: () => void;
  endIcon?: React.ReactNode;
  border?: string;
}) => {
  return (
    <button
      className={`bg-secondary ${border} py-1.5 px-4 rounded-md flex items-center justify-center font-medium cursor-pointer`}
      onClick={onclick}
    >
      <span>{text}</span>
      {endIcon && <div className="ml-2">{endIcon}</div>}
    </button>
  );
};

export default ActionButton;
