// LayoutWithHeader.tsx
import Header from "../partials/Header";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithHeader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1 pt-[90px]">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithHeader;
