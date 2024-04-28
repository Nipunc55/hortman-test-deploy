import React from "react";

const QuestionInputText = ({
  label,
  placeholder,
  value,
  // error,
  // errorMessage,
  onInputChange,
  styles
}: {
  label?: string;
  placeholder: string;
  value: string;
  // error?: boolean;
  // errorMessage?: string;
  onInputChange: (e: any) => void | Promise<void>;
  styles?: React.CSSProperties;
}) => {
  return (
    <div className="w-full">
      <span className="font-normal normal-case text-black-500 text-sm">
        {label}
      </span>
      <div className="gold-gradient-input-border-select mt-0.75">
        <input
          style={{
            height: "40px",
            ...styles
          }}
          className="border-none p-2.5 w-full outline-none placeholder:text-[#808080]"
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default QuestionInputText;
