import React from "react";
import Modal from "@/Components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TRACKS = [
  { title: "River Flows in You", artist: "Yiruma", duration: "3:04" },
  { title: "The Ludlows", artist: "James Horner", duration: "5:50" },
  { title: "Clair de Lune", artist: "Claude Debussy", duration: "5:02" },
  { title: "Moonlight Sonata", artist: "Ludwig van Beethoven", duration: "5:32" },
  { title: "Bloom", artist: "ODESZA", duration: "3:50" },
];

export const PlaylistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="DANH SÁCH NHẠC">
      <div className="w-[980px] max-w-full">
        <div className="flex gap-6">
          {/* Left: Playlist */}
          <div className="flex-1 bg-[#0C2350] rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Thêm nhạc yêu thích của bạn</h3>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex-1">
                <input
                  className="w-full px-3 py-2 rounded-md outline-none bg-white text-[#0C1A57]"
                  placeholder="Liên kết từ Youtube"
                />
              </div>
              <button className="px-4 py-2 bg-white text-[#0C1A57] rounded-md">Tìm</button>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg font-semibold">♪ Mặc định</span>
            </div>

            <div className="space-y-3">
              {TRACKS.map((t) => (
                <div
                  key={t.title}
                  className="flex items-center justify-between bg-white/10 rounded-md px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center text-xs text-slate-700">
                      thumbnail
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{t.title}</div>
                      <div className="text-slate-300 text-xs">{t.artist}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-slate-300 text-xs">{t.duration}</div>
                    <button className="text-xs text-[#0C1A57] bg-white/10 px-3 py-1 rounded-md">Play</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Volume & Ambients */}
          <div className="w-80 flex flex-col gap-6">
            <div className="bg-[#072147] rounded-lg p-5 text-white">
              <h4 className="text-lg font-semibold text-center mb-3">ÂM LƯỢNG</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300">Nhạc</label>
                  <input type="range" min={0} max={100} defaultValue={30} className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Âm thanh</label>
                  <input type="range" min={0} max={100} defaultValue={50} className="w-full" />
                </div>
              </div>
            </div>

            <div className="bg-[#072147] rounded-lg p-5 text-white">
              <h4 className="text-lg font-semibold text-center mb-3">ÂM THANH</h4>
              <p className="text-sm text-slate-300 text-center mb-3">Chọn âm thanh bạn yêu thích</p>

              <div className="grid grid-cols-2 gap-3">
                {["Mưa rơi", "Lò sưởi", "Gió nhẹ", "Thư viện"].map((name) => (
                  <button key={name} className="flex flex-col items-center gap-2 bg-white/5 rounded-md p-3">
                    <div className="text-sm text-[#0C1A57]">{name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-white/80 text-sm">
              Tùy chọn âm thanh nền và điều chỉnh âm lượng tại đây.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistModal;