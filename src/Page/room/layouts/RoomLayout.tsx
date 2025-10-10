import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { WelcomeRoom } from "../components/WelcomeRoom";
import defaultBackground from "../../../assets/image/defaultBackground.png";

const RoomLayout = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (showWelcome) {
    return <WelcomeRoom />;
  }

  return (
    <div
      className="relative flex flex-col min-h-screen w-full text-blue-900"
      style={{
        backgroundImage: `url(${defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="flex-1 w-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default RoomLayout;
