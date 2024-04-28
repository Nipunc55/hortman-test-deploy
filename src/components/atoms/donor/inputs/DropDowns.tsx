import { type FC, type SelectHTMLAttributes } from "react";

interface DropDownSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const DropDownSelect: FC<DropDownSelectProps> = ({ options, ...rest }) => {
  return (
    <div className="custom-select">
      <select className="" defaultValue="All" {...rest}>
        <option value="All" className="hover:bg-white">
          All
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="hover:bg-white focus:bg-red-300"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownSelect;
