interface ModalInputTextProps {
  text: string;
  color?: string;
  textSize?: string;
}

const ModalInputText = ({
  text,
  color = "text-black-500",
  textSize = "text-sm"
}: ModalInputTextProps) => {
  return (
    <div className={`${color} ${textSize} font-normal normal-case`}>{text}</div>
  );
};

export default ModalInputText;
