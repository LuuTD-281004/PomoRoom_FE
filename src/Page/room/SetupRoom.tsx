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
  updateRoomStatus,
} from "@/axios/room";
import { RemovePersonalRoomModal } from "./components/RemovePersonalRoomModal";
import type { PersonalRoom } from "@/types/room";
import { RoomStatus } from "@/enum/room-status";

const FOCUS_OPTIONS = [1, 5, 15, 25, 50];
const SHORT_BREAK_OPTIONS = [1, 3, 5, 10];
const LONG_BREAK_OPTIONS = [1, 10, 15, 20];

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

  const updateCurrentElapse = async (personalRoom: PersonalRoom) => {
    try {
      if (personalRoom) {
        const room: PersonalRoom = personalRoom;
        let duration = room.focusTime * 60; // total seconds
        if (personalRoom.roomStatus === RoomStatus.ON_REST) {
          duration = room.shortRestTime * 60;
        } else if (personalRoom.roomStatus === RoomStatus.ON_LONG_REST) {
          duration = room.longRestTime * 60;
        }

        const updatedAt = new Date(room.updatedAt).getTime();
        const now = Date.now();

        const elapsed = Math.floor((now - updatedAt) / 1000);
        const remainingTime = Math.max(duration - elapsed, 0);
        setIsPrivate(true);
        setRemaining(remainingTime);
        setRunning(remainingTime > 0);
      }
    } catch (error) {
      console.error("Error fetching current working room:", error);
    }
  };

  const updateRoom = async () => {
    try {
      const response = await updateRoomStatus();
      if (response.status === 200) {
        const personalRoom: PersonalRoom = response.data.result;
        await updateCurrentElapse(personalRoom);
      }
    } catch (error) {
      console.error("Error updating room status:", error);
      setIsPrivate(false);
      setRemaining(setup.focusMinutes * 60);
      setRunning(false);
    }
  };

  const fetchCurrentRoom = async () => {
    try {
      const response = await getCurrentWorkingPersonalRoom();
      if (response.status === 200) {
        const room: PersonalRoom = response.data.result;
        let duration = room.focusTime * 60; // total seconds
        if (room.roomStatus === RoomStatus.ON_REST) {
          duration = room.shortRestTime * 60;
        } else if (room.roomStatus === RoomStatus.ON_LONG_REST) {
          duration = room.longRestTime * 60;
        }
        const updatedAt = new Date(room.updatedAt).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - updatedAt) / 1000);
        const remainingTime = Math.max(duration - elapsed, 0);

        if (remainingTime <= 0) {
          // already expired, update the room status first
          await updateRoom();
          return;
        }
        await updateCurrentElapse(room);
      } else {
        setIsPrivate(false);
        setRemaining(setup.focusMinutes * 60);
        setRunning(false);
      }
    } catch (error) {
      console.error("Error fetching current working room:", error);
      setIsPrivate(false);
    }
  };

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setTimeout(() => {
            updateRoom();
          }, 200);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, remaining]);

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

        await updateCurrentElapse(response.data.result);
        if (response.status === 200) {
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
        await updateCurrentElapse(response.data.result);
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
        {Math.floor(remaining / 60)
          .toString()
          .padStart(2, "0")}
        :{(remaining % 60).toString().padStart(2, "0")}
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
