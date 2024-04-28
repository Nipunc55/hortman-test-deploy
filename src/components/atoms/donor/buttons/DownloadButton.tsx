import DownloadButtonIcon from "../../../../assets/svg/downloadButtonIcon";

interface DownloadButtonProps {
  title: string;
  onClick: () => void;
}

const DownloadButton = ({
  title = "Download",
  onClick
}: DownloadButtonProps) => {
  return (
    <button
      className="downloadButton-bg text-white text-base font-medium uppercase min-w-[280px] flex items-center justify-center gap-2 p-2 hover:scale-95 duration-300"
      onClick={onClick}
    >
      <DownloadButtonIcon />
      {title}
    </button>
  );
};

export default DownloadButton;
