// LayoutWithHeader.tsx
import Header from "../partials/Header";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithHeader: React.FC = () => {
  return (
    <div className="min-h-screen flex w-screen flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        <Navbar />
      </div>
      <main className="flex-1 pt-[156px]">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithHeader;
