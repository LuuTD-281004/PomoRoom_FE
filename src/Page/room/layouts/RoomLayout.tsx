import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PlaylistModal from "../components/PlaylistModal";
import ThemeModal from "../components/ThemeModal";
import { WelcomeRoom } from "../components/WelcomeRoom";
import StarExchangeModal from "../components/StarExchangeModal";
import { useTranslation } from "react-i18next";
import defaultBackground from "../../../assets/image/defaultBackground.png"; 

const RoomLayout = () => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
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
        <div className="flex bg-white items-center h-fit gap-2 border-2 text-[#0C1A57] font-medium border-[#0C1A57] p-1 px-5 rounded-md shadow-md">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.24609 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3703 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z"
              fill="#FFE414"
              stroke="#FFE414"
            />
          </svg>
          100
        </div>
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

      <nav className="flex flex-col fixed bottom-10 -right-5">
        <div className="flex flex-col space-y-20">
          <button
            onClick={() => setShowPlaylist(true)}
            className="!text-white text-center !p-4 !rounded-none !rounded-t-lg -rotate-90 !bg-[#0C1A57] hover:text-yellow-400 transition-colors"
          >
            <span>{t("roomLayout.music")}</span>
          </button>
          <button
            onClick={() => setShowTheme(true)}
            className="!text-white text-center !p-4 !rounded-none !rounded-t-lg -rotate-90 !bg-[#0C1A57] hover:text-yellow-400 transition-colors"
          >
            <span>{t("roomLayout.theme")}</span>
          </button>
        </div>
      </nav>

      <PlaylistModal isOpen={showPlaylist} onClose={() => setShowPlaylist(false)} />
      <ThemeModal isOpen={showTheme} onClose={() => setShowTheme(false)} />
      <StarExchangeModal
        isOpen={showStarExchange}
        onClose={() => setShowStarExchange(false)}
      />
    </div>
  );
};

export default RoomLayout;
