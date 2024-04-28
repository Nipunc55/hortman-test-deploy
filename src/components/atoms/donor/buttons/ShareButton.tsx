import ShareButtonIcon from "../../../../assets/svg/shareButtonIcon";

interface ShareButtonProps {
  title: string;
  onClick: () => void;
}

const ShareButton = ({ title = "Share", onClick }: ShareButtonProps) => {
  return (
    <button
      className="shareButton-bg text-[#9A793D] text-base font-medium uppercase min-w-[280px] flex items-center justify-center gap-2 p-2 hover:scale-95 duration-300"
      onClick={onClick}
    >
      <ShareButtonIcon />
      {title}
    </button>
  );
};

export default ShareButton;
