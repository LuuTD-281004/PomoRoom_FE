// ...existing code...
import { PlayIcon, PauseIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CancelModal from "./components/CancelModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useNavigate } from "react-router-dom";

const PrivateRoom = () => {
    const { setup } = useRoomSetup();
    const navigate = useNavigate();

    const initialSeconds = setup?.focusMinutes ? setup.focusMinutes * 60 : 25 * 60;
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

    const handleStart = () => setRunning(true);
    const handlePause = () => setRunning(false);

    const handleStop = () => setShowCancel(true);
    const handleConfirmExit = () => {
      setShowCancel(false);
      setRunning(false);
      setRemaining((setup?.focusMinutes ?? 25) * 60); // reset
      navigate("/rooms");
    };
    const handleCancelClose = () => setShowCancel(false);

    const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
    const ss = (remaining % 60).toString().padStart(2, "0");

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* Timer Display */}
            <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
                {mm}:{ss}
            </div>

            {/* Music Player */}
            <div className="flex items-center gap-4 bg-white/80 px-6 py-3 rounded-lg">
                <span className="text-gray-700">🎵 Tiếng mưa lofi chill 1 hour non-stop</span>
                <div className="flex gap-2">
                    <button className="p-1" onClick={handleStart}><PlayIcon size={20} /></button>
                    <button className="p-1" onClick={handlePause}><PauseIcon size={20} /></button>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={handleStart}
                    className="bg-white px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-blue-600"
                >
                    Bắt Đầu
                </button>
                <button
                    onClick={handleStop}
                    className="bg-white px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-blue-600"
                >
                    Dừng
                </button>
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