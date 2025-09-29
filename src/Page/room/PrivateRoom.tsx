import { PlayIcon, PauseIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CancelModal from "./components/CancelModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/Components/Button";
import { createPersonalRoom } from "@/axios/room";

const PrivateRoom = () => {
  const { setup } = useRoomSetup();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialSeconds = setup?.focusMinutes
    ? setup.focusMinutes * 60
    : 25 * 60;
  const [remaining, setRemaining] = useState<number>(initialSeconds);
  const [running, setRunning] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // sync when setup changes
  useEffect(() => {
    const secs = (setup?.focusMinutes ?? 25) * 60;
    setRemaining(secs);
    setRunning(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [setup]);

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

  const handleStart = async () => {
    const response = await createPersonalRoom(
      setup.shortBreakMinutes,
      setup.longBreakMinutes,
      setup.focusMinutes
    );
    if (response) {
      setRunning(true);
    }
  };

  const handleStop = () => setShowCancel(true);
  const handleConfirmExit = () => {
    setShowCancel(false);
    setRunning(false);
    setRemaining((setup?.focusMinutes ?? 25) * 60); // reset
    navigate("/rooms");
  };
  const handleCancelClose = () => setShowCancel(false);

  const mm = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* Timer Display */}
      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {mm}:{ss}
      </div>

      {/* Music Player */}
      <div className="flex items-center gap-4 bg-white/80 px-6 py-3 rounded-lg">
        <span className="text-gray-700">{t("privateRoom.music_label")}</span>
        <div className="flex gap-2">
          {/* chỉ điều khiển nhạc, không đụng tới timer */}
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
          onClick={handleStart}
          color="gray"
          size="wide"
          disabled={running} // Đang chạy thì disable Start
        >
          {t("privateRoom.start")}
        </Button>

        <Button
          onClick={handleStop}
          color="gray"
          size="wide"
          disabled={!running} // Chưa chạy thì disable Stop
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

export default PrivateRoom;
