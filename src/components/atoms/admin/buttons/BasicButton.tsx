import React from "react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

const BasicButton = ({
  onClick,
  text,
  style,
  styledBorderEnabled = true,
  isLoading
}: {
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
  styledBorderEnabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={`${
        styledBorderEnabled ? "gold-gradient-basic-button" : " border-none"
      } bg-primary rounded-md cursor-pointer flex items-center justify-center`}
      onClick={onClick}
    >
      <div
        className="px-10 py-2 text-white flex items-center justify-center w-auto h-auto"
        style={{
          borderRadius: "0.5rem",
          ...style
        }}
      >
        {isLoading !== null && isLoading && (
          <div className="mr-3">
            <LoaderIconSvg />
          </div>
        )}
        {text}
      </div>
    </div>
  );
};

export default BasicButton;
