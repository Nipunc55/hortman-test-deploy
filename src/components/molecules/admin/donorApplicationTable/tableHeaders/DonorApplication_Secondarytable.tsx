import PlusIcon from "../../../../../assets/svg/plusIcon";

const DonorApplicationSecondarytableHeadingWithIcon = ({
  TableHeading,
  ButtonHeading,
  style,
  handleClick
}: {
  TableHeading: string;
  ButtonHeading: string;
  style?: string;
  handleClick: (TableHeading: string) => void;
}) => {
  return (
    <div
      className={`bg-secondary w-full h-full max-h-12 py-2  px-6 flex justify-between items-center ${style}`}
    >
      <span className="text-black text-xl font-medium capitalize">
        {TableHeading}
      </span>
      <div>
        <button
          onClick={() => handleClick(TableHeading)}
          className="w-full h-8 px-3.5 py-1 bg-primary rounded shadow justify-start items-center gap-1 inline-flex text-white hover:scale-95 cursor-pointer duration-1000"
        >
          <PlusIcon />
          {ButtonHeading}
        </button>
      </div>
    </div>
  );
};

const DonorApplicationSecondarytableHeading = ({
  TableHeading
}: {
  TableHeading: string;
}) => {
  return (
    <div className="bg-secondary w-full h-full max-h-12 px-6 py-2 flex justify-between items-center">
      <span className="text-black text-xl font-medium capitalize">
        {TableHeading}
      </span>
    </div>
  );
};

export {
  DonorApplicationSecondarytableHeadingWithIcon,
  DonorApplicationSecondarytableHeading
};
