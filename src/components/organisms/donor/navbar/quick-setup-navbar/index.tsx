// import { t } from "i18next";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/svg/logo";

const QuickSetupNavbar = () => {
  const navItems = [
    {
      name: "Logout",
      path: "/login",
      value: "1"
    }
  ];
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
        <div className="flex gap-8 container mx-auto justify-end px-40">
          <div className="text-base font-medium capitalize text-white  flex py-3.75  min-h-[53px] ">
            {/* {t("quick-setup")} */}
            {navItems.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`text-base font-medium capitalize text-white flex cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out  `}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSetupNavbar;
