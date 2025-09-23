import { TrophyIcon, UserIcon, BellIcon, ClockIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JoinRoomModal } from "./components/JoinRoomModal";

const SetupRoom = () => {
    const [showJoinModal, setShowJoinModal] = useState(false);
    return (
        <div className="flex h-screen bg-blue-100">
            {/* Left Navigation */}
            <nav className="w-20 bg-[#0C1A57] top-60 fixed flex flex-col h-fit items-center rounded-r-lg space-y-8">
                <div className="flex flex-col">
                    <Link to="#" className="p-2 py-6 flex border-b border-white flex-col gap-1 items-center !text-white hover:text-yellow-400 transition-colors">
                        <UserIcon size={24} />
                        <span className="text-xs">Tài khoản</span>
                    </Link>
                    <Link to="#" className="p-2 py-6 flex border-b border-white flex-col gap-1 items-center !text-white hover:text-yellow-400 transition-colors">
                        <ClockIcon size={24} />
                        <span className="text-xs">Lịch sử</span>
                    </Link>
                    <Link to="#" className="p-2 py-6 flex border-b border-white flex-col gap-1 items-center !text-white hover:text-yellow-400 transition-colors">
                        <BellIcon size={24} />
                        <span className="text-xs">Thông báo</span>
                    </Link>
                    <Link to="#" className="p-2 py-6 flex border-b border-white flex-col gap-1 items-center !text-white hover:text-yellow-400 transition-colors">
                        <TrophyIcon size={24} className="text-yellow-300" />
                        <span className="text-xs">VVip</span>
                    </Link>
                    <Link to="#" className="p-2 py-6 flex flex-col gap-1 items-center !text-white hover:text-yellow-400 transition-colors">
                        <SettingsIcon size={24} />
                        <span className="text-xs">Cài đặt</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                {/* Timer Display */}
                <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
                    25:00
                </div>

                {/* Timer Controls */}
                <div className="flex gap-8 mb-8">
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Tập trung</p>
                        <select className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                            <option>25 phút</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Nghỉ ngắn</p>
                        <select className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                            <option>05 phút</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <p className="text-blue-600 font-medium mb-2">Nghỉ dài</p>
                        <select className="bg-white px-4 py-2 rounded-lg border border-blue-200">
                            <option>10 phút</option>
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

            {/* Right Navigation */}
            <nav className="flex flex-col fixed bottom-10 -right-5">
                {/* Action Buttons */}
                <div className="flex flex-col space-y-20">
                    <Link to="#" className="!text-white text-center p-4 rounded-t-lg -rotate-90 bg-[#0C1A57] hover:text-yellow-400 transition-colors">
                        <span className="">Nhạc</span>
                    </Link>
                    <Link to="#" className="!text-white text-center p-4 rounded-t-lg -rotate-90 bg-[#0C1A57] hover:text-yellow-400 transition-colors">
                        <span className="">Giao diện</span>
                    </Link>
                </div>
            </nav>

            {/* Join Room Modal */}
            <JoinRoomModal
                isOpen={showJoinModal}
                onClose={() => setShowJoinModal(false)}
            />
        </div>
    );
};

export default SetupRoom;