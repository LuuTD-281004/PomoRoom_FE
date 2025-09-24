import { TrophyIcon, UserIcon, BellIcon, ClockIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PlaylistModal from "../components/PlaylistModal";
import ThemeModal from "../components/ThemeModal";

const RoomLayout = () => {
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [showTheme, setShowTheme] = useState(false);
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
            <main className="w-full mt-36">
                <Outlet />
            </main>

            {/* Right Navigation */}
            <nav className="flex flex-col fixed bottom-10 -right-5">
                {/* Action Buttons */}
                <div className="flex flex-col space-y-20">
                    <button
                        onClick={() => setShowPlaylist(true)}
                        className="!text-white text-center !p-4 !rounded-none !rounded-t-lg -rotate-90 !bg-[#0C1A57] hover:text-yellow-400 transition-colors"
                    >
                        <span className="">Nhạc</span>
                    </button>
                    <button
                        onClick={() => setShowTheme(true)}
                        className="!text-white text-center !p-4 !rounded-none !rounded-t-lg -rotate-90 !bg-[#0C1A57] hover:text-yellow-400 transition-colors"
                    >
                        <span className="">Giao diện</span>
                    </button>
                </div>
            </nav>
            <PlaylistModal isOpen={showPlaylist} onClose={() => setShowPlaylist(false)} />
            <ThemeModal isOpen={showTheme} onClose={() => setShowTheme(false)} />
        </div>
    )
}

export default RoomLayout