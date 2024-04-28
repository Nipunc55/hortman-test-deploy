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
  crossOrigin,
  styles
}: TextInpuProps) => {
  return (
    <div className={styles}>
      <Input label={label} icon={icon} crossOrigin={crossOrigin} />
    </div>
  );
};

export default TextInput;
