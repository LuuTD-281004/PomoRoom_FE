// LayoutWithHeader.tsx
import Header from "../partials/Header";
import Navbar from "../Navbar";
import { Outlet, useLocation } from "react-router-dom";

const LayoutWithHeader: React.FC = () => {
  const location = useLocation();
  const isPrivateRoom = location.pathname.startsWith("/private-room") || location.pathname.startsWith("/group-room");

  return (
    <div className="min-h-screen flex w-screen flex-col">
      {!isPrivateRoom && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
          <Navbar />
        </div>
      )}
      <main className={`flex-1 ${!isPrivateRoom ? "pt-[136px]" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithHeader;
