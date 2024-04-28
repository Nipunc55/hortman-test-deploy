import { useTranslation } from "react-i18next";
import { InstagramIcon } from "../../../../assets/svg/instagramIcon";
import LinkedinIcon from "../../../../assets/svg/linkedinIcon";
import WebMarkIcon from "../../../../assets/svg/webMarkIcon";

interface FooterProps {
  textColor?: string;
  stroke?: string;
}

const Footer = ({ textColor = "text-black-500" }: FooterProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 w-full pb-5">
      <div className="flex gap-4 justify-center">
        <div className="w-1.875 h-1.875">
          <InstagramIcon />
        </div>
        <div className="w-1.875 h-1.875">
          <LinkedinIcon />
        </div>
        <div className="w-1.875 h-1.875">
          <WebMarkIcon />
        </div>
      </div>
      <div
        className={`${textColor} text-center text-base font-medium uppercase tracking-widest`}
      >
        {t("footer")}
      </div>
    </div>
  );
};

export default Footer;
