import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "@/Components/Button";
import CancelModal from "./components/CancelModal";
import { getCurrentWorkingPersonalRoom, updateRoomStatus, stopPersonalRoom } from "@/axios/room";
import type { PersonalRoom } from "@/types/room";
import { RoomStatus } from "@/enum/room-status";

const PrivateRoomPage = () => {
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const updateCurrentElapse = async (personalRoom: PersonalRoom) => {
    if (!personalRoom) return;
    let duration = personalRoom.focusTime * 60;
    if (personalRoom.roomStatus === RoomStatus.ON_REST)
      duration = personalRoom.shortRestTime * 60;
    else if (personalRoom.roomStatus === RoomStatus.ON_LONG_REST)
      duration = personalRoom.longRestTime * 60;

    const updatedAt = new Date(personalRoom.updatedAt).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - updatedAt) / 1000);
    const remainingTime = Math.max(duration - elapsed, 0);

    setRemaining(remainingTime);
    setRunning(remainingTime > 0);
  };

  const fetchCurrentRoom = async () => {
    try {
      const response = await getCurrentWorkingPersonalRoom();
      if (response.status === 200 && response.data?.result) {
        await updateCurrentElapse(response.data.result);
      }
    } catch (err) {
      console.error("Error fetching room:", err);
    }
  };

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setTimeout(() => updateRoomStatus(), 200);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  const handleStop = () => setShowCancel(true);
  const handleConfirmExit = async () => {
    setShowCancel(false);
    setRunning(false);
    await stopPersonalRoom();
    window.location.href = "/rooms"; // back to setup
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {Math.floor(remaining / 60).toString().padStart(2, "0")}:
        {(remaining % 60).toString().padStart(2, "0")}
      </div>

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

      <div className="flex gap-4 mt-8">
        <Button onClick={() => setRunning(true)} color="gray" size="wide" disabled={running}>
          {t("privateRoom.start")}
        </Button>

        <Button onClick={handleStop} color="gray" size="wide" disabled={!running}>
          {t("privateRoom.stop")}
        </Button>
      </div>

      <CancelModal
        isOpen={showCancel}
        onOK={handleConfirmExit}
        onCancel={() => setShowCancel(false)}
      />
    </div>
  );
};

export default PrivateRoomPage;
