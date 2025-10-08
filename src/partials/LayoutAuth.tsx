// LayoutAuth.tsx
import Header from "../partials/Header";
import { Outlet } from "react-router-dom";

const LayoutAuth: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAuth;
