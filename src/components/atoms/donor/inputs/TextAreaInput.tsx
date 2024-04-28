import { Textarea } from "@material-tailwind/react";

interface TextAreaInputProps {
  height?: string;
  name: string;
  value: string;
  onChange: (e: any) => void | Promise<void>;
  // error?: boolean;
  // errorMessage?: string;
  label: string;
  placeholder: string;
}

const TextAreaInput = ({
  height = "h-45",
  name,
  value,
  onChange,
  // error,
  // errorMessage,
  label,
  placeholder
}: TextAreaInputProps) => {
  return (
    <>
      <span className="font-normal normal-case text-black-500 text-sm">
        {label}
      </span>
      <div className="gold-gradient-input-border-select mt-0.75">
        <Textarea
          className={`border-none ${height}`}
          labelProps={{
            className: "hidden"
          }}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default TextAreaInput;
