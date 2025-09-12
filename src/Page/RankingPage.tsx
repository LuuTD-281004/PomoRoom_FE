import React from "react";
import { Flame, Crown } from "lucide-react";
import avatar from "../assets/image/avatar.png";

type User = {
  name: string;
  hours: number;
  avatar: string;
  rank: number;
};

const RankingPage: React.FC = () => {
  const top3: User[] = [
    { name: "Demos", hours: 50, avatar: avatar, rank: 1 },
    { name: "Bạn", hours: 40, avatar: avatar, rank: 2 },
    { name: "Raf", hours: 38, avatar: avatar, rank: 3 },
  ];

  const crownColors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-400",
    3: "text-orange-400",
  };

  return (
    <main>
      {/* Section 1 */}
      <section className="w-full min-w-screen flex flex-col bg-[#E3EEFF] items-center justify-center py-16 px-6 mt-15 h-[100px]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0C1A57]">
          BẢNG XẾP HẠNG TOP 10 CỦA THÁNG
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
    </main>
  );
};

export default RankingPage;
