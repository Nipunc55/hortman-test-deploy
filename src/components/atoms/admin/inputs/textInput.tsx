import { Input } from "@material-tailwind/react";

interface TextInpuProps {
  label?: string;
  icon?: JSX.Element;
  crossOrigin?: string;
  styles?: string;
}

const TextInput = ({
  label = "Input With Icon",
  icon = <i className="fas fa-heart" />,
  crossOrigin
}: TextInpuProps) => {
  return (
    <div className="text-black normal-case font-normal overflow-hidden text-sm bg-secondary py-1.5 px-7 rounded-3xl gold-gradient-border">
      <Input
        label={label}
        icon={icon}
        crossOrigin={crossOrigin}
        className="text-black normal-case font-normal overflow-hidden text-sm bg-secondary py-1.5 px-7 rounded-3xl gold-gradient-border"
      />
    </div>
  );
};

export default TextInput;
