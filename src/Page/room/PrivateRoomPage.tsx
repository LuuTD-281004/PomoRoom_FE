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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [trackTitle, setTrackTitle] = useState<string>(""); // 🆕 thêm tên bài nhạc
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const file = localStorage.getItem("selectedTrackFile");
    const title = localStorage.getItem("selectedTrackTitle");
    setTrackTitle(title || "Unknown");

    if (file) {
      const existing = window.__CURRENT_AUDIO;
      if (existing) {
        setAudio(existing);
        setIsPlaying(!existing.paused);
      } else {
        const newAudio = new Audio(file);
        newAudio.loop = true;
        setAudio(newAudio);
        newAudio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, []);

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

  const updateRoom = async () => {
    try {
      const response = await updateRoomStatus();
      if (response.status === 200 && response.data?.result) {
        await updateCurrentElapse(response.data.result);
      }
    } catch (err) {
      console.error("Error update room:", err);
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
          setTimeout(() => updateRoom(), 200);
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
    if (audio) audio.pause();
    await stopPersonalRoom();
    window.location.href = "/rooms";
  };

  const togglePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {Math.floor(remaining / 60).toString().padStart(2, "0")}:
        {(remaining % 60).toString().padStart(2, "0")}
      </div>

      <div className="flex flex-col items-center bg-white/80 px-6 py-3 rounded-lg">
        <span className="text-gray-700 text-sm mb-1">
          🎵 {trackTitle || "Không có nhạc"}
        </span>
        <button className="p-1" onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <Button onClick={() => setRunning(true)} color="gray" size="wide" disabled={running}>
          {t("privateRoom.start")}
        </Button>

        <Button onClick={handleStop} color="gray" size="wide" disabled={!running}>
          {t("privateRoom.stop")}
        </Button>
      </div>

      <CancelModal isOpen={showCancel} onOK={handleConfirmExit} onCancel={() => setShowCancel(false)} />
    </div>
  );
};

export default PrivateRoomPage;
