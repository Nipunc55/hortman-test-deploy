import { Outlet } from "react-router-dom";
import Logo from "../../assets/svg/logo";

const BasicLayout = () => {
  return (
    <div className="bg-secondary  min-h-screen flex flex-col ">
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
            <div className="text-base font-medium capitalize text-white  flex py-3.75  h-11"></div>
          </div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BasicLayout;
