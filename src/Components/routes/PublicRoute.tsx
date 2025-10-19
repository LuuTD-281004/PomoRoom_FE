import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const PublicRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    console.log("toast public triggered");
    toast.info("You are already logged in.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
