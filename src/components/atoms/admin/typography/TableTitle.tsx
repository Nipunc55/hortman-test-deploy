interface TableTitleProps {
  text: string;
  color?: string;
  textSize?: string;
}

const TableTitle = ({
  text,
  color = "text-black",
  textSize = "text-2xl"
}: TableTitleProps) => {
  return (
    <h3 className={`${color} ${textSize} font-medium capitalize`}>{text}</h3>
  );
};

export default TableTitle;
