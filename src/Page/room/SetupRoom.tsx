import { UserIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JoinRoomModal } from "./components/JoinRoomModal";
import { useRoomSetup } from "@/contexts/RoomSetupContext";

const FOCUS_OPTIONS = [15, 25, 50]; // minutes
const SHORT_BREAK_OPTIONS = [3, 5, 10];
const LONG_BREAK_OPTIONS = [10, 15, 20];

const SetupRoom = () => {
    const [showJoinModal, setShowJoinModal] = useState(false);
    const { setup, setSetup } = useRoomSetup()
    return (
        <>
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                {/* Timer Display */}
                <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
                    {String(setup.focusMinutes).padStart(2, "0")}:00
                </div>

                {/* Timer Controls */}
                <div className="flex gap-8 mb-8">
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Tập trung</p>
                        <select
                            className="bg-white px-4 py-2 rounded-lg border border-blue-200"
                            value={setup.focusMinutes}
                            onChange={(e) => setSetup({ focusMinutes: Number(e.target.value) })}
                        >
                            {FOCUS_OPTIONS.map((m) => <option key={m} value={m}>{m} phút</option>)}
                        </select>
                    </div>
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Nghỉ ngắn</p>
                        <select
                            className="bg-white px-4 py-2 rounded-lg border border-blue-200"
                            value={setup.shortBreakMinutes}
                            onChange={(e) => setSetup({ shortBreakMinutes: Number(e.target.value) })}
                        >
                            {SHORT_BREAK_OPTIONS.map((m) => <option key={m} value={m}>{m} phút</option>)}
                        </select>
                    </div>
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Nghỉ dài</p>
                        <select
                            className="bg-white px-4 py-2 rounded-lg border border-blue-200"
                            value={setup.longBreakMinutes}
                            onChange={(e) => setSetup({ longBreakMinutes: Number(e.target.value) })}
                        >
                            {LONG_BREAK_OPTIONS.map((m) => <option key={m} value={m}>{m} phút</option>)}
                        </select>
                    </div>
                </div>

                {/* Room Type Selection */}
                <div className="flex gap-4">
                    <Link to="/private-room" className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        <UserIcon size={20} />
                        <span>Phòng cá nhân</span>
                    </Link>
                    <button
                        onClick={() => setShowJoinModal(true)}
                        className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        <UsersIcon size={20} />
                        <span>Phòng nhóm</span>
                    </button>
                </div>

                {/* Quote */}
                <p className="text-gray-600 italic mt-8">
                    "Ngày mới tốt lành nhé, tên bạn."
                </p>
            </main>
            {/* Join Room Modal */}
            <JoinRoomModal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
            />
        </>
    );
};

export default SetupRoom;