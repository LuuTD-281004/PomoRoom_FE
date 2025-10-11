import { useState, useEffect } from "react";
import { UserIcon, UsersIcon } from "lucide-react";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useTranslation } from "react-i18next";
import {
  createPersonalRoom,
  getCurrentWorkingPersonalRoom,
  stopPersonalRoom,
} from "@/axios/room";
import { RemovePersonalRoomModal } from "./components/RemovePersonalRoomModal";
import { useNavigate } from "react-router-dom";
import PlaylistModal from "./components/PlaylistModal";

const FOCUS_OPTIONS = [1, 25, 50];
const SHORT_BREAK_OPTIONS = [1, 3, 5, 10];
const LONG_BREAK_OPTIONS = [1, 10, 15, 20];

const SetupRoomPage = () => {
  const { setup, setSetup } = useRoomSetup();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showRemoveOldRoom, setShowRemoveOldRoom] = useState(false);
  const [pendingStart, setPendingStart] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [_selectedTrack, setSelectedTrack] = useState<{ title: string; file: string } | null>(null);
  
  const handleTrackSelected = async (
    track: { title: string; file: string; type: "file" | "youtube" },
    _staticBg?: string | null
  ) => {
    setSelectedTrack(track);
    setShowPlaylistModal(false);
    try {
      const response = await createPersonalRoom(
        setup.shortBreakMinutes,
        setup.longBreakMinutes,
        setup.focusMinutes
      );
      if (response.status === 200) {
        navigate("/private-room");
      } else if (response.status === 422) {
        setShowRemoveOldRoom(true);
      }
    } catch (error: any) {
      console.error("Error creating personal room:", error);
      if (error?.response?.status === 422) {
        setShowRemoveOldRoom(true);
      }
    }
  };

  // -------------------------------
  // Redirect if user already has a room
  // -------------------------------
  const fetchCurrentRoom = async () => {
    try {
      const response = await getCurrentWorkingPersonalRoom();
      if (response.status === 200 && response.data?.result) {
        navigate("/private-room"); // redirect to private room page
      }
    } catch (error) {
      console.error("Error fetching current working room:", error);
    }
  };

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  // -------------------------------
  // Start Private Room
  // -------------------------------
  const handleRemoveOldRoom = async () => {
    setPendingStart(true);
    try {
      const stopResult = await stopPersonalRoom();
      if (stopResult.status === 200) {
        const response = await createPersonalRoom(
          setup.shortBreakMinutes,
          setup.longBreakMinutes,
          setup.focusMinutes
        );
        if (response.status === 200) navigate("/private-room");
      }
    } catch (e) {
      console.error("Failed to remove old room:", e);
    } finally {
      setPendingStart(false);
      setShowRemoveOldRoom(false);
    }
  };

  const handleStartPrivate = async () => {
    setShowPlaylistModal(true);
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <>
      <main className="flex-1 flex flex-col items-center mb-30">
        {/* Timer Display */}
        <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
          {String(setup.focusMinutes).padStart(2, "0")}:00
        </div>

        <div className="flex gap-8 mb-8 justify-center flex-wrap">
          {/* Focus Time */}
          <div className="text-center">
            <p className="text-white font-medium mb-2">{t("setup.focus")}</p>
            <div className="relative inline-block">
              <select
                className="appearance-none bg-white text-gray-700 font-medium px-4 py-2 pr-8 rounded-lg border border-blue-200 shadow-sm 
                          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition hover:border-blue-300 hover:shadow-md"
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

              {/* Custom icon mũi tên */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Short Break */}
          <div className="text-center">
            <p className="text-white font-medium mb-2">
              {t("setup.short_break")}
            </p>
            <div className="relative inline-block">
              <select
                className="appearance-none bg-white text-gray-700 font-medium px-4 py-2 pr-8 rounded-lg border border-blue-200 shadow-sm 
                          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition hover:border-blue-300 hover:shadow-md"
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

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Long Break */}
          <div className="text-center">
            <p className="text-white font-medium mb-2">
              {t("setup.long_break")}
            </p>
            <div className="relative inline-block">
              <select
                className="appearance-none bg-white text-gray-700 font-medium px-4 py-2 pr-8 rounded-lg border border-blue-200 shadow-sm 
                          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition hover:border-blue-300 hover:shadow-md"
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

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleStartPrivate}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <UserIcon size={20} />
            <span>{t("setup.private_room")}</span>
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <UsersIcon size={20} />
            <span>{t("setup.group_room")}</span>
          </button>
        </div>

        <p className="text-white font-bold italic mt-8">
          {t("setup.greeting", { name: "tên bạn" })}
        </p>
      </main>

      <PlaylistModal
        isOpen={showPlaylistModal}
        onClose={() => setShowPlaylistModal(false)}
        onTrackSelect={handleTrackSelected}
      />

      <JoinRoomModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />

      <RemovePersonalRoomModal
        open={showRemoveOldRoom}
        onClose={() => setShowRemoveOldRoom(false)}
        onConfirm={handleRemoveOldRoom}
        loading={pendingStart}
      />
    </>
  );
};

export default SetupRoomPage;
