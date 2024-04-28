import React from "react";

const BasicButton = ({
  onClick,
  text,
  style,
  styledBorderEnabled = true,
  styledFullyRounded = false,
  disabled = false
}: {
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
  styledBorderEnabled?: boolean;
  styledFullyRounded?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`${
        styledBorderEnabled
          ? styledFullyRounded
            ? "gold-gradient-basic-button-50pxButton"
            : "gold-gradient-basic-button"
          : " border-none"
      } rounded-md cursor-pointer`}
      onClick={onClick}
    >
      <button
        disabled={disabled}
        className="px-10 py-2 text-white w-auto h-auto flex justify-center items-center"
        style={{
          borderRadius: "0.5rem",
          ...style
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default BasicButton;
