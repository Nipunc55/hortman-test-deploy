const PrimaryTypo = ({ typo }: { typo: string }) => {
  return <div className="text-base font-normal capitalize">{typo}</div>;
};

const TableHeaderSecondary = ({ typo }: { typo: any }) => {
  return (
    <div className="text-5xl font-medium text-primary capitalize">{typo}</div>
  );
};

const TableTitle = ({
  text,
  color = "text-black",
  textSize = "text-2xl"
}: {
  text: string;
  color?: string;
  textSize?: string;
}) => {
  return (
    <h3 className={`${color} ${textSize} font-medium capitalize`}>{text}</h3>
  );
};

export { PrimaryTypo, TableHeaderSecondary, TableTitle };
