import React, { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const InputField = ({
  label,
  placeholder,
  value,
  // error,
  // errorMessage,
  onInputChange,
  styles,
  disabled
}: {
  label?: string;
  placeholder: string;
  value: string | number;
  // error?: boolean;
  // errorMessage?: string;
  onInputChange: (e: any) => void | Promise<void>;
  styles?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  return (
    <div className="">
      <span
        className={`font-normal normal-case text-black-500 text-sm ${
          isArabic ? "text-right" : "text-left"
        } w-full  flex justify-${isArabic ? "end" : "start"}`}
      >
        {label}
      </span>
      <div className="gold-gradient-input-border-select mt-0.75">
        <input
          style={{
            height: "40px",
            ...styles
          }}
          className={`border-none p-2.5 w-full outline-none !text-black-500 !font-medium  placeholder:text-[#959DAD] text-[14px] ${
            isArabic && "text-right"
          }`}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onInputChange}
          disabled={disabled || false}
        />
      </div>
    </div>
  );
};

export default InputField;
