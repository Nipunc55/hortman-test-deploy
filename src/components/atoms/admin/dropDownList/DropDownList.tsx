import { useEffect, useState } from "react";
import Select from "react-select";
import i18n from "../../../../i18n";

const DropDownList = ({
  options,
  value,
  onChange,
  isClearable = false,
  isSearchable = false,
  name,
  placeholder,
  placeholderSize = "text-sm",
  height,
  disabled
}: {
  options: any;
  value: string;
  // onSelect: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onChange: (e: { value: string; label: string }) => void | Promise<void>;
  isClearable?: boolean;
  isSearchable?: boolean;
  name: string;
  placeholder?: string;
  placeholderSize?: string;
  height?: string;
  disabled?: boolean;
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: "none",
      borderRadius: "10px",
      border: "none",
      ":hover": {
        border: "none"
      },
      ":focus": {
        border: "none"
      },
      backgroundColor: "white",
      color: "#000000",
      width: "100%",
      height: height || null
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#EFE8D8" : "white",
      ":hover": {
        backgroundColor: "#EFE8D8"
      },
      color: "#000000"
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#9A793D" // Custom colour
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: "none"
    })
  };

  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    // Add an event listener to update the locale when the language changes
    i18n.on("languageChanged", updateLocale);

    // Remove the event listener when the component is unmounted
    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  return (
    <div>
      <span
        className={`font-normal normal-case text-black-500 ${placeholderSize} ${
          isArabic ? "text-right" : "text-left"
        } w-full  flex justify-${isArabic ? "end" : "start"}`}
      >
        {placeholder}
      </span>
      <Select
        options={options}
        className={`mt-0.75 gold-gradient-input-border-select  placeholder:text-[#808080] h-[40px]  ${
          isArabic && "text-right"
        }`}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        styles={customStyles}
        onChange={(e) => onChange(e as any)}
        value={{ value, label: value }}
        placeholder={placeholder}
        isDisabled={disabled || false}
      />
    </div>
  );
};

export default DropDownList;
