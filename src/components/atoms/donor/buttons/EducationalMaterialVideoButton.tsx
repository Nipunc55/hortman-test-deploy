const EducationalMaterialVideoButton = ({
  title,
  onClickFun
}: {
  title: string;
  onClickFun: () => void;
}) => {
  return (
    <button
      onClick={onClickFun}
      className="rounded-[50px] border border-buttonBorderPrimary text-buttonBorderPrimary py-2.5 px-10 font-medium uppercase hover:scale-95 duration-300 min-w-[242.61px]"
    >
      {title}
    </button>
  );
};

export default EducationalMaterialVideoButton;
