import React, { useEffect, useState } from "react";
import i18n from "../../../../i18n";

const InputField = ({
  label,
  placeholder,
  value,
  // error,
  errorMessage,
  onInputChange,
  name,
  styles,
  type = "text",
  required
}: {
  label?: string;
  placeholder: string;
  value: string;
  name?: string;
  type?: string;
  required?: boolean;
  // error?: boolean;
  errorMessage?: string;
  onInputChange: (e: any) => void | Promise<void>;
  styles?: React.CSSProperties;
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
      <span className={`font-normal normal-case text-black-500 text-sm w-full`}>
        {label}
      </span>
      <div
        className={`gold-gradient-input-border-select  mt-0.75 ${errorMessage ? "error-border" : ""}`}
      >
        <input
          style={{
            height: "40px",
            ...styles
          }}
          className={`border-none p-2.5 w-full outline-none placeholder:text-[#959DAD] text-[14px] ${
            isArabic && "text-right"
          }`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onInputChange}
          name={name}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputField;
