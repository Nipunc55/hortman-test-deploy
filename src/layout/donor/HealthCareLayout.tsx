import { Outlet } from "react-router-dom";
import Navbar from "../../components/organisms/donor/navbar/health-care-navbar";
import Footer from "../../components/organisms/donor/footer/footer";

const HealthCareLayout = () => {
  return (
    <div className="bg-secondary  min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="flex items-end justify-end">
        <Footer stroke={"#D8B470"} textColor="text-black-500" />
      </div>
    </div>
  );
};

export default HealthCareLayout;
