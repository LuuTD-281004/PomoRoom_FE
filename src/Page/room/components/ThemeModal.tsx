import React from "react";
import Modal from "@/Components/Modal";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const STATIC_PREVIEWS = [1, 2, 3];
const DYNAMIC_PREVIEWS = [1, 2, 3];
const DECORATIONS = [
  { id: "leaf", name: "Lá rơi" },
  { id: "petals", name: "Cánh hoa rơi" },
  { id: "rain", name: "Mưa rơi" },
  { id: "sun", name: "Nắng" },
];
const STARS = [
  {
    color: "#FF7A7A",
    label: "Hồng",
  },
  { color: "#FFCF7A", label: "Cam" },
  { color: "#C6FF7A", label: "Vàng" },
  { color: "#7AF6FF", label: "Xanh nước" },
  { color: "#7A9BFF", label: "Xanh dương" },
  {
    color: "#C57AFF", label: "Tím"
  }
]

export const ThemeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="GIAO DIỆN">
      <div className="w-[1000px] max-w-full">
        <div className="flex gap-2">
          {/* Left column */}
          <div className="flex-1 rounded-lg p-6 text-white">
            {/* Color row */}
            <div className="mb-6">
              <div className="text-lg font-semibold mb-3">Màu chủ đạo</div>
              <div className="flex items-start gap-3">
                {STARS.map((s) => (
                  <svg key={s.color} width="57" height="54" viewBox="0 0 57 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.5 0L35.1232 20.384H56.5562L39.2165 32.982L45.8397 53.366L28.5 40.768L11.1603 53.366L17.7835 32.982L0.443832 20.384H21.8768L28.5 0Z" fill={s.color} />
                  </svg>
                ))}
                <div className="text-center">
                  <div
                    className="!size-14 !rounded-full"
                    style={{
                      background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
                    }}
                  />
                  <span className="text-xs">Tùy chỉnh</span>
                </div>
              </div>
            </div>

            {/* Static backgrounds */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">Chọn nền tĩnh</div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button className="bg-white/10 rounded flex items-center justify-center"><ArrowLeft className="!text-[#0C1A57] size-4" /></button>
                  <button className="bg-white/10 rounded flex items-center justify-center"><ArrowRight className="!text-[#0C1A57] size-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {STATIC_PREVIEWS.map((p) => (
                  <button
                    key={`static-${p}`}
                    className="bg-white/5 rounded-lg w-full h-28 p-2 flex flex-col items-center gap-2 hover:scale-[1.02] transition"
                  />
                ))}
              </div>
            </div>

            {/* Dynamic backgrounds */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">Chọn nền động <span className="ml-2 text-yellow-300">👑</span></div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button className="bg-white/10 rounded flex items-center justify-center"><ArrowLeft className="!text-[#0C1A57] size-4" /></button>
                  <button className="bg-white/10 rounded flex items-center justify-center"><ArrowRight className="!text-[#0C1A57] size-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {DYNAMIC_PREVIEWS.map((p) => (
                  <button
                    key={`dyn-${p}`}
                    className="bg-white/5 rounded-lg w-full h-28 p-2 flex flex-col items-center gap-2 hover:scale-[1.02] transition"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/40" />

          {/* Right column */}
          <div className="w-80 pl-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white text-lg font-semibold">TRANG TRÍ</div>
              <div className="text-sm text-yellow-300 flex items-center gap-2">
                <span>👑</span>
                <span>Hiệu ứng</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {DECORATIONS.map((d) => (
                <div key={d.id} className="flex items-center gap-3 bg-white/5 rounded p-3">
                  <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center text-xs text-white/80">img</div>
                  <div className="text-xs text-white">{d.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal >
  );
};

export default ThemeModal;
