import { PlayIcon, PauseIcon } from "lucide-react";
import { Link } from "react-router-dom";

const PrivateRoom = () => {
    return (
        <div className="flex h-screen bg-blue-100">
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
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
                    <button className="bg-white px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-blue-600">
                        Dừng
                    </button>
                </div>
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
        </div>
    );
};

export default PrivateRoom;