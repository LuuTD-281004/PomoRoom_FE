import { UserIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useTranslation } from "react-i18next";

const FOCUS_OPTIONS = [15, 25, 50];
const SHORT_BREAK_OPTIONS = [3, 5, 10];
const LONG_BREAK_OPTIONS = [10, 15, 20];

const SetupRoom = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { setup, setSetup } = useRoomSetup();
  const { t } = useTranslation();

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Timer Display */}
        <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
          {String(setup.focusMinutes).padStart(2, "0")}:00
        </div>

        {/* Timer Controls */}
        <div className="flex gap-8 mb-8">
          <div className="text-center">
            <p className="text-blue-600 font-medium mb-2">{t("setup.focus")}</p>
            <select
              className="bg-white px-4 py-2 rounded-lg border border-blue-200"
              value={setup.focusMinutes}
              onChange={(e) =>
                setSetup({ focusMinutes: Number(e.target.value) })
              }
            >
              {FOCUS_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {t("setup.minutes", { count: m })}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <p className="text-blue-600 font-medium mb-2">{t("setup.short_break")}</p>
            <select
              className="bg-white px-4 py-2 rounded-lg border border-blue-200"
              value={setup.shortBreakMinutes}
              onChange={(e) =>
                setSetup({ shortBreakMinutes: Number(e.target.value) })
              }
            >
              {SHORT_BREAK_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {t("setup.minutes", { count: m })}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <p className="text-blue-600 font-medium mb-2">{t("setup.long_break")}</p>
            <select
              className="bg-white px-4 py-2 rounded-lg border border-blue-200"
              value={setup.longBreakMinutes}
              onChange={(e) =>
                setSetup({ longBreakMinutes: Number(e.target.value) })
              }
            >
              {LONG_BREAK_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {t("setup.minutes", { count: m })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Room Type Selection */}
        <div className="flex gap-4">
          <Link
            to="/private-room"
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <UserIcon size={20} />
            <span>{t("setup.private_room")}</span>
          </Link>
          <button
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <UsersIcon size={20} />
            <span>{t("setup.group_room")}</span>
          </button>
        </div>

        {/* Quote */}
        <p className="text-gray-600 italic mt-8">
          {t("setup.greeting", { name: "tên bạn" })}
        </p>
      </main>

      <JoinRoomModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </>
  );
};

export default SetupRoom;
