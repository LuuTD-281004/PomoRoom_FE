import { PlayIcon, PauseIcon } from "lucide-react";
import { useState } from "react";
import CancelModal from "./components/CancelModal";

const PrivateRoom = () => {
    const [showCancel, setShowCancel] = useState(false);

    const handleConfirmExit = () => {
        console.log("User confirmed exit");
        setShowCancel(false);
    };

    const handleCancelClose = () => {
        setShowCancel(false);
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* Timer Display */}
            <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
                25:00
            </div>

            {/* Music Player */}
            <div className="flex items-center gap-4 bg-white/80 px-6 py-3 rounded-lg">
                <span className="text-gray-700">🎵 Tiếng mưa lofi chill 1 hour non-stop</span>
                <div className="flex gap-2">
                    <button className="p-1"><PlayIcon size={20} /></button>
                    <button className="p-1"><PauseIcon size={20} /></button>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 mt-8">
                <button className="bg-white px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-blue-600">
                    Bắt Đầu
                </button>
                <button
                    onClick={() => setShowCancel(true)}
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