// LayoutWithHeader.tsx
import Header from "../partials/Header";
import { Outlet } from "react-router-dom";

const LayoutWithMinimizedHeader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <main className="flex-1 mt-[90px]">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithMinimizedHeader;
