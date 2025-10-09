import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { WelcomeRoom } from "../components/WelcomeRoom";
import StarExchangeModal from "../components/StarExchangeModal";
import { useTranslation } from "react-i18next";
import defaultBackground from "../../../assets/image/defaultBackground.png";

const RoomLayout = () => {
  const [showStarExchange, setShowStarExchange] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const { t } = useTranslation();

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
      <div className="fixed flex items-center gap-4 top-40 p-4 right-5">
        <div
          onClick={() => setShowStarExchange(true)}
          className="text-xs cursor-pointer text-center h-fit font-medium text-white"
        >
          <svg
            className="mx-auto"
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.4375 15.5391H34.6641V14.7422C34.6641 9.68203 30.5602 5.57812 25.5 5.57812C20.4398 5.57812 16.3359 9.68203 16.3359 14.7422V15.5391H9.5625C8.68096 15.5391 7.96875 16.2513 7.96875 17.1328V43.8281C7.96875 44.7097 8.68096 45.4219 9.5625 45.4219H41.4375C42.319 45.4219 43.0312 44.7097 43.0312 43.8281V17.1328C43.0312 16.2513 42.319 15.5391 41.4375 15.5391ZM19.9219 14.7422C19.9219 11.6593 22.4171 9.16406 25.5 9.16406C28.5829 9.16406 31.0781 11.6593 31.0781 14.7422V15.5391H19.9219V14.7422ZM39.4453 41.8359H11.5547V19.125H16.3359V23.5078C16.3359 23.727 16.5152 23.9062 16.7344 23.9062H19.5234C19.7426 23.9062 19.9219 23.727 19.9219 23.5078V19.125H31.0781V23.5078C31.0781 23.727 31.2574 23.9062 31.4766 23.9062H34.2656C34.4848 23.9062 34.6641 23.727 34.6641 23.5078V19.125H39.4453V41.8359Z"
              fill="#FFFFFF"
            />
            <path
              d="M32.0759 30.4176L27.8608 29.805L25.9765 25.985C25.925 25.8804 25.8403 25.7957 25.7358 25.7442C25.4734 25.6148 25.1547 25.7227 25.0235 25.985L23.1393 29.805L18.9241 30.4176C18.8079 30.4342 18.7017 30.489 18.6203 30.572C18.522 30.6731 18.4678 30.809 18.4697 30.9501C18.4715 31.0911 18.5293 31.2256 18.6303 31.324L21.68 34.2974L20.9595 38.4959C20.9426 38.5936 20.9534 38.694 20.9907 38.7859C21.028 38.8777 21.0902 38.9572 21.1704 39.0155C21.2506 39.0737 21.3455 39.1084 21.4444 39.1154C21.5433 39.1224 21.6421 39.1017 21.7298 39.0554L25.5 37.0732L29.2702 39.0554C29.3732 39.1102 29.4927 39.1284 29.6072 39.1085C29.8961 39.0587 30.0903 38.7848 30.0405 38.4959L29.32 34.2974L32.3697 31.324C32.4527 31.2427 32.5075 31.1364 32.5241 31.0202C32.569 30.7297 32.3664 30.4607 32.0759 30.4176Z"
              fill="#FFFFFF"
            />
          </svg>
          {t("roomLayout.starExchange")}
        </div>
      </div>

      <main className="flex-1 w-full flex items-center justify-center">
        <Outlet />
      </main>
      <StarExchangeModal
        isOpen={showStarExchange}
        onClose={() => setShowStarExchange(false)}
      />
    </div>
  );
};

export default RoomLayout;
