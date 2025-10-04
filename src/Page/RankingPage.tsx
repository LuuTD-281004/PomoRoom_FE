import React from "react";
import { Flame, Crown } from "lucide-react";
import avatar from "../assets/image/avatar.png";
import Footer from "../partials/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type User = {
  name: string;
  hours: number;
  avatar: string;
  rank: number;
};

const RankingPage: React.FC = () => {
  const { t } = useTranslation();
  const top3: User[] = [
    { name: "Demos", hours: 50, avatar: avatar, rank: 1 },
    { name: t("ranking.you"), hours: 40, avatar: avatar, rank: 2 },
    { name: "Raf", hours: 38, avatar: avatar, rank: 3 },
  ];

  const crownColors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-400",
    3: "text-orange-400",
  };

  return (
    <div>
      <main>
        {/* Section 1 */}
        <section className="w-full min-w-screen flex flex-col bg-[#E3EEFF] items-center justify-center py-16 px-6 mt-5 h-[100px]">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0C1A57]">
            {t("ranking.top_10")}
          </h1>
        </section>

        {/* Section 2 */}
        <section className="w-full flex justify-center bg-[#F5F9FF] py-20 px-6">
          <div className="flex items-end justify-center gap-12 max-w-6xl w-full">
            {/* Rank 2 */}
            <div className="flex flex-col items-center mt-12">
              <div className="relative flex flex-col items-center z-10">
                <Crown className={`absolute -top-6 w-8 h-8 ${crownColors[2]}`} />
                <img
                  src={top3[1].avatar}
                  alt={top3[1].name}
                  className="rounded-full w-28 h-28 border-4 border-gray-400 object-cover"
                />
              </div>
              <div className="bg-[#E3F2FD] rounded-2xl shadow-lg text-center -mt-8 w-56 p-8">
                <p className="font-bold text-[#0C1A57] text-lg">{top3[1].name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Flame className="w-6 h-6 text-red-500" />
                  <p className="text-2xl font-extrabold text-green-600">
                    {top3[1].hours}h
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center z-10">
                <Crown className={`absolute -top-8 w-10 h-10 ${crownColors[1]}`} />
                <img
                  src={top3[0].avatar}
                  alt={top3[0].name}
                  className="rounded-full w-32 h-32 border-4 border-yellow-400 object-cover"
                />
              </div>
              <div className="bg-[#E3F2FD] rounded-2xl shadow-lg text-center -mt-10 w-64 p-10">
                <p className="font-bold text-[#0C1A57] text-xl">{top3[0].name}</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Flame className="w-7 h-7 text-red-500" />
                  <p className="text-3xl font-extrabold text-green-600">
                    {top3[0].hours}h
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-16">
              <div className="relative flex flex-col items-center z-10">
                <Crown className={`absolute -top-6 w-8 h-8 ${crownColors[3]}`} />
                <img
                  src={top3[2].avatar}
                  alt={top3[2].name}
                  className="rounded-full w-28 h-28 border-4 border-orange-400 object-cover"
                />
              </div>
              <div className="bg-[#E3F2FD] rounded-2xl shadow-lg text-center -mt-8 w-56 p-8">
                <p className="font-bold text-[#0C1A57] text-lg">{top3[2].name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Flame className="w-6 h-6 text-red-500" />
                  <p className="text-2xl font-extrabold text-green-600">
                    {top3[2].hours}h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-full flex justify-center bg-white py-16 px-6">
          <div className="flex flex-col gap-10 max-w-5xl w-full">
            {[
              { rank: 4, name: "TD", hours: 37, avatar: avatar },
              { rank: 5, name: "Bùi Công Nam", hours: 35, avatar: avatar },
              { rank: 6, name: "Soobin", hours: 34, avatar: avatar },
              { rank: 7, name: "Neko", hours: 29, avatar: avatar },
              { rank: 8, name: "Rhyder", hours: 25, avatar: avatar },
              { rank: 9, name: "Captain", hours: 17, avatar: avatar },
              { rank: 10, name: "Daniel", hours: 2, avatar: avatar },
            ].map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between bg-[#C9DDF8] rounded-4xl shadow py-3 px-4"
              >
                <div className="flex items-center gap-4">
                  <p className="text-gray-600 font-bold w-6 mr-4">{user.rank.toString().padStart(2, "0")}</p>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-[#0234A7]-300 object-cover"
                  />
                  <p className="font-bold text-[#0C1A57] ml-4">{user.name}</p>
                </div>
                <p className="text-green-600 font-bold mr-16">{user.hours}h</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full bg-[#426CC2] py-4 mb-10">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-30 text-white font-semibold tracking-wide">
              {Array(6)
                .fill("POMOROOM")
                .map((text, i) => (
                  <span key={i}>{text}</span>
                ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 px-6">
          <h1 className="text-4xl md:text-5xl text-center font-bold text-[#0C1A57]">
            THÀNH TÍCH CÁ NHÂN CỦA BẠN
          </h1>
          <div className="max-w-5xl mx-auto py-12 w-full grid grid-cols-12 gap-6 items-start">
            {/* Left: profile card */}
            <div className="col-span-7 bg-[#EAF6FF] rounded-2xl p-6 flex gap-6 items-start">
              <img
                src={avatar}
                alt="avatar"
                className="w-40 h-40 rounded-lg object-cover border-4 border-white shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#0C1A57]">Thỏ 7 màu</h2>
                <p className="text-sm text-[#0C1A57] mt-2">
                  Thành tích cá nhân của bạn
                </p>

                <div className="h-px bg-[#0234A7] my-4 w-full opacity-50" />

                <div className="flex gap-12">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0C1A57]">40</div>
                    <div className="text-sm text-[#0C1A57] mt-2 flex justify-center">
                      <svg width="40" height="40" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.4999 4.58325C14.8958 4.58325 4.58325 14.8958 4.58325 27.4999C4.58325 40.1041 14.8958 50.4166 27.4999 50.4166C40.1041 50.4166 50.4166 40.1041 50.4166 27.4999C50.4166 14.8958 40.1041 4.58325 27.4999 4.58325ZM35.5208 32.0833C34.8333 33.2291 33.4583 33.4582 32.3124 32.9999L26.3541 29.5624C25.6666 29.1041 25.2083 28.4166 25.2083 27.4999V16.0416C25.2083 14.6666 26.1249 13.7499 27.4999 13.7499C28.8749 13.7499 29.7916 14.6666 29.7916 16.0416V26.1249L34.6041 28.8749C35.7499 29.5624 35.9791 30.9374 35.5208 32.0833Z" fill="#0C1A57" />
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0C1A57]">450</div>
                    <div className="text-sm text-[#0C1A57] mt-2 flex justify-center">
                      <svg width="40" height="40" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50.4166 23.1458C50.6458 21.9999 49.7291 20.6249 48.5833 20.6249L35.5208 18.7916L29.5624 6.87494C29.3333 6.41661 29.1041 6.18744 28.6458 5.95827C27.4999 5.27077 26.1249 5.72911 25.4374 6.87494L19.7083 18.7916L6.64575 20.6249C5.95825 20.6249 5.49992 20.8541 5.27075 21.3124C4.35409 22.2291 4.35409 23.6041 5.27075 24.5208L14.6666 33.6874L12.3749 46.7499C12.3749 47.2083 12.3749 47.6666 12.6041 48.1249C13.2916 49.2708 14.6666 49.7291 15.8124 49.0416L27.4999 42.8541L39.1874 49.0416C39.4166 49.2708 39.8749 49.2708 40.3333 49.2708C40.5624 49.2708 40.5624 49.2708 40.7916 49.2708C41.9374 49.0416 42.8541 47.8958 42.6249 46.5208L40.3333 33.4583L49.7291 24.2916C50.1874 24.0624 50.4166 23.6041 50.4166 23.1458Z" fill="#FFEB57" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0C1A57]">2</div>
                    <div className="text-sm text-[#0C1A57] mt-2 flex justify-center">
                      <svg width="40" height="43" viewBox="0 0 61 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.2083 4.83325H33.0416V14.6425C36.6795 15.0227 40.1672 16.2323 43.2083 18.1684V4.83325ZM27.9583 4.83325H17.7916V18.1684C20.8326 16.2323 24.3203 15.0227 27.9583 14.6425V4.83325ZM30.4999 53.1666C35.2186 53.1666 39.7439 51.3843 43.0805 48.2118C46.4171 45.0393 48.2916 40.7365 48.2916 36.2499C48.2916 31.7633 46.4171 27.4605 43.0805 24.288C39.7439 21.1155 35.2186 19.3333 30.4999 19.3333C25.7813 19.3333 21.2559 21.1155 17.9193 24.288C14.5827 27.4605 12.7083 31.7633 12.7083 36.2499C12.7083 40.7365 14.5827 45.0393 17.9193 48.2118C21.2559 51.3843 25.7813 53.1666 30.4999 53.1666ZM27.3864 32.579L30.4999 26.5833L33.6135 32.579L40.5725 33.5384L35.5375 38.2074L36.727 44.7977L30.4999 41.6874L24.2754 44.7977L25.4649 38.2074L20.4298 33.5384L27.3864 32.579Z" fill="#EB892D" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: social interactions */}
            <aside className="col-span-5 bg-[#EAF6FF] rounded-2xl p-6 max-h-96">
              <h3 className="text-3xl font-bold text-[#0C1A57] mb-4">Tương tác xã hội</h3>

              <ul className="space-y-3 overflow-auto max-h-72">
                {Array.from({ length: 8 }).map((_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img
                      src={avatar}
                      alt={`avatar-${i}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#0C1A57]">
                        Thỏ 7 màu{" "}
                        <span className="font-normal text-xs text-gray-500">
                          đã tham gia vào phòng
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Nội dung tương tác mẫu #{i + 1}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

          </div>
          <button className="bg-[#0C1A57] block text-white w-80 mx-auto rounded-md py-4 text-3xl font-bold">
            <Link to="/rooms">
              THAM GIA PHÒNG
            </Link>
          </button>
        </section>

      </main>
      <div className="w-full h-[20px] bg-[#0C1A57] mb-2" />

      <Footer />
    </div>
  );
};

export default RankingPage;
