import { Outlet } from "react-router-dom";
import QuickSetupNavbar from "../../components/organisms/donor/navbar/quick-setup-navbar";
import Footer from "../../components/organisms/admin/footer/footer";

const QuickSetupLayout = () => {
  return (
    <div className="bg-secondary  min-h-screen flex flex-col">
      <QuickSetupNavbar />
      <main>
        <Outlet />
      </main>
      <div className="flex items-end justify-end">
        <Footer stroke={"#D8B470"} textColor="text-black-500" />
      </div>
    </div>
  );
};

export default QuickSetupLayout;
