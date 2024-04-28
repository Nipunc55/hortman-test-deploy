import { Textarea } from "@material-tailwind/react";

export function TextareaDefault({
  label,
  placeholder,
  value,
  onInputChange,
  styles
}: {
  label?: string;
  placeholder: string;
  value: string;
  onInputChange: (e: any) => void | Promise<void>;
  styles?: React.CSSProperties;
}) {
  return (
    <div className="gold-gradient-input-border-select mt-0.75">
      <Textarea
        label={label}
        className="border-none p-2.5 w-full outline-none placeholder:text-[#808080]"
        style={{
          ...styles
        }}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
}
