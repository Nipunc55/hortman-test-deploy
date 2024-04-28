import { t } from "i18next";
import DownloadButton from "../../../atoms/admin/buttons/DownloadButton";
import ShareButton from "../../../atoms/admin/buttons/ShareButton";

const UnitStatus = () => {
  const handleDownloadClick = () => {
    console.log("Download button clicked");
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
  };
  return (
    <div className="">
      <div className="py-11 justify-center items-center flex h-80">
        <span className="text-center text-black text-xs font-medium">
          UC Status page
        </span>
      </div>
      <div className="flex justify-between pt-6 pb-2 px-4 border-t border-secondary ">
        <DownloadButton onClick={handleDownloadClick} title={t("download")} />
        <ShareButton onClick={handleShareClick} title={t("share")} />
      </div>
    </div>
  );
};

export default UnitStatus;
