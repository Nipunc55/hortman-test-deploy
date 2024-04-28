import { Outlet } from "react-router-dom";
import Navbar from "../../components/organisms/admin/navbar/Navbar";
import Footer from "../../components/organisms/admin/footer/footer";

const Rootlayout = () => {
  return (
    <div className="bg-secondary  min-h-screen flex flex-col">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <div className="flex items-end justify-end">
        <Footer />
      </div>
    </div>
  );
};

export default Rootlayout;
