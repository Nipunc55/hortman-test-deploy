// import { t } from "i18next";
import Logo from "../../../../../assets/svg/logo";

const QuickSetupNavbar = () => {
  return (
    <div className="">
      {/* Header - navbar */}
      <div className="flex justify-start items-center container mx-auto py-5">
        <div className="">
          <Logo />
        </div>
      </div>
      {/* Nav-Items - navbar */}
      <div className="flex  bg-primary">
        <div className="flex gap-8 container mx-auto">
          <div className="text-base font-medium capitalize text-white  flex py-3.75  min-h-[53px]">
            {/* {t("quick-setup")} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSetupNavbar;
