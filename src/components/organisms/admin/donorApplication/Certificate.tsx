import { t } from "i18next";
import CertificateIcon from "../../../../assets/svg/certificateIcon";
import DownloadButton from "../../../atoms/admin/buttons/DownloadButton";
import ShareButton from "../../../atoms/admin/buttons/ShareButton";

const Certificate = () => {
  const handleDownloadClick = () => {
    console.log("Download button clicked");
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
  };
  return (
    <div className="">
      <div className="py-11 justify-center flex">
        <CertificateIcon />
      </div>
      <div className="flex justify-between pt-6 pb-2 px-4 border-t border-secondary">
        <DownloadButton onClick={handleDownloadClick} title={t("download")} />
        <ShareButton onClick={handleShareClick} title={t("share")} />
      </div>
    </div>
  );
};

export default Certificate;
