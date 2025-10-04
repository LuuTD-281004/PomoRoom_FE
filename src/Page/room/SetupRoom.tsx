import { useState, useEffect, useRef } from "react";
import { UserIcon, UsersIcon, PlayIcon, PauseIcon } from "lucide-react";
import { JoinRoomModal } from "./components/JoinRoomModal";
import CancelModal from "./components/CancelModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useTranslation } from "react-i18next";
import Button from "@/Components/Button";
import {
  createPersonalRoom,
  getCurrentWorkingPersonalRoom,
  stopPersonalRoom,
} from "@/axios/room";
import { RemovePersonalRoomModal } from "./components/RemovePersonalRoomModal";

const FOCUS_OPTIONS = [15, 25, 50];
const SHORT_BREAK_OPTIONS = [3, 5, 10];
const LONG_BREAK_OPTIONS = [10, 15, 20];

const SetupRoom = () => {
  const { setup, setSetup } = useRoomSetup();
  const { t } = useTranslation();

  const [showRemoveOldRoom, setShowRemoveOldRoom] = useState(false);
  const [pendingStart, setPendingStart] = useState(false);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const [remaining, setRemaining] = useState(setup.focusMinutes * 60);
  const [running, setRunning] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const fetchCurrentRoom = async () => {
    try {
      const response = await getCurrentWorkingPersonalRoom();
      if (response.status === 200 && response.data?.result) {
        const room = response.data.result;
        const focusDuration = (room.focusTime ?? setup.focusMinutes) * 60; // total seconds

        // Convert UTC time to UTC+7 (add 7 hours)
        const updatedAtUtc = new Date(room.updatedAt);
        const updatedAtLocal = updatedAtUtc.getTime() + 7 * 60 * 60 * 1000;

        const now = Date.now();
        const elapsed = Math.floor((now - updatedAtLocal) / 1000);
        const remainingTime = Math.max(focusDuration - elapsed, 0);
        console.log(elapsed, remainingTime);
        setIsPrivate(true);
        setRemaining(remainingTime);
        setRunning(remainingTime > 0);
      }
    } catch (error) {
      console.error("Error fetching current working room:", error);
    }
  };

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  // Reset timer when setup changes
  // useEffect(() => {
  //   const secs = (setup?.focusMinutes ?? 25) * 60;
  //   setRemaining(secs);
  //   setRunning(false);
  //   if (intervalRef.current) {
  //     window.clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   }
  // }, [setup]);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            // finished
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const handleRemoveOldRoom = async () => {
    setPendingStart(true);
    try {
      const stopResult = await stopPersonalRoom();
      if (stopResult.status === 200) {
        // retry create
        const response = await createPersonalRoom(
          setup.shortBreakMinutes,
          setup.longBreakMinutes,
          setup.focusMinutes
        );
        if (response?.status === 200) {
          setIsPrivate(true);
          setRunning(true);
        }
      }
    } catch (e) {
      console.error("Failed to remove old room:", e);
    } finally {
      setPendingStart(false);
      setShowRemoveOldRoom(false);
    }
  };

  const handleStartPrivate = async () => {
    try {
      const response = await createPersonalRoom(
        setup.shortBreakMinutes,
        setup.longBreakMinutes,
        setup.focusMinutes
      );

      if (response.status === 200) {
        setIsPrivate(true);
        setRunning(true);
      } else if (response.status === 422) {
        setShowRemoveOldRoom(true);
      }
    } catch (error: any) {
      console.error("Error creating personal room:", error);

      if (error?.response?.status === 422) {
        setShowRemoveOldRoom(true);
        return;
      }
    }
  };

  const handleStop = () => setShowCancel(true);
  const handleConfirmExit = async () => {
    setShowCancel(false);
    setRunning(false);
    setIsPrivate(false);
    await stopPersonalRoom();
    // setRemaining((setup?.focusMinutes ?? 25) * 60);
  };
  const handleCancelClose = () => setShowCancel(false);

  const mm = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  // -------------------------
  // VIEW 1: Setup Mode
  // -------------------------
  if (!isPrivate) {
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
              <p className="text-blue-600 font-medium mb-2">
                {t("setup.focus")}
              </p>
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
              <p className="text-blue-600 font-medium mb-2">
                {t("setup.short_break")}
              </p>
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
              <p className="text-blue-600 font-medium mb-2">
                {t("setup.long_break")}
              </p>
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

          {/* Room Selection */}
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

          {/* Quote */}
          <p className="text-gray-600 italic mt-8">
            {t("setup.greeting", { name: "tên bạn" })}
          </p>
        </main>
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
        ;
      </>
    );
  }

  // -------------------------
  // VIEW 2: Private Room Mode
  // -------------------------
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {mm}:{ss}
      </div>

      {/* Music Controls */}
      <div className="flex items-center gap-4 bg-white/80 px-6 py-3 rounded-lg">
        <span className="text-gray-700">{t("privateRoom.music_label")}</span>
        <div className="flex gap-2">
          <button className="p-1">
            <PlayIcon size={20} />
          </button>
          <button className="p-1">
            <PauseIcon size={20} />
          </button>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          onClick={() => setRunning(true)}
          color="gray"
          size="wide"
          disabled={running}
        >
          {t("privateRoom.start")}
        </Button>

        <Button
          onClick={handleStop}
          color="gray"
          size="wide"
          disabled={!running}
        >
          {t("privateRoom.stop")}
        </Button>
      </div>

      <CancelModal
        isOpen={showCancel}
        onOK={handleConfirmExit}
        onCancel={handleCancelClose}
      />
    </div>
  );
};

export default SetupRoom;
