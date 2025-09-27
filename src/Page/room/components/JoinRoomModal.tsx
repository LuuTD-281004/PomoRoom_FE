import Modal from "@/Components/Modal";
import Button from "@/Components/Button"; 
import { UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ROOMS = [
  { name: "Địa chủ", count: "1/3" },
  { name: "Ông Nấm", count: "5/5" },
  { name: "Số đỏ", count: "2/4" },
  { name: "Hiệu Phong", count: "1/3" },
  { name: "Cột sống", count: "5/5" },
  { name: "Muôn màu", count: "2/4" }
];

export const JoinRoomModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const pages: (number | string)[] = [1, 2, "...", 10];
  const current = 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="light"
      title={t("joinRoomModal.title")}
    >
      <div className="w-[980px] max-w-full">
        <div className="flex gap-6">
          {/* Left: Public list */}
          <div className="flex-1 bg-[#0ec0db] rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-3xl font-semibold text-white text-center">
                {t("joinRoomModal.public")}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {ROOMS.map((r) => (
                <button
                  key={r.name}
                  className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-full h-16 bg-gradient-to-br from-sky-200 to-sky-100 rounded-md mb-2 overflow-hidden flex items-center justify-center">
                    <span className="text-xs text-slate-600">ảnh</span>
                  </div>
                  <div className="w-full flex justify-between items-center px-2">
                    <span className="text-sm font-medium text-slate-800 text-start flex-1">
                      {r.name}
                    </span>
                    <span className="text-xs text-slate-500">{r.count}</span>
                    <UsersIcon className="text-slate-400 ml-1" size={16} />
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                aria-label="Previous page"
                className="w-8 h-8 flex items-center justify-center text-[#0C1A57] rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                &lt;
              </button>

              {pages.map((p, idx) =>
                typeof p === "number" ? (
                  <button
                    key={idx}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition
                      ${
                        p === current
                          ? "bg-white text-[#0C1A57] font-medium"
                          : "bg-white/20 text-[#0C1A57] hover:bg-white/40"
                      }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={idx} className="text-white/90 px-1">
                    {p}
                  </span>
                )
              )}

              <button
                aria-label="Next page"
                className="w-8 h-8 flex items-center text-[#0C1A57] justify-center rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="w-80 flex flex-col gap-6">
            {/* Create room */}
            <div className="bg-[#13a8c7] rounded-lg p-5">
              <h4 className="text-2xl font-semibold text-white text-center mb-3">
                {t("joinRoomModal.createRoom")}
              </h4>
              <div className="flex gap-3 justify-center">
                <Button color="gray" size="default">
                  {t("joinRoomModal.private")}
                </Button>
                <Button color="gray" size="default">
                  {t("joinRoomModal.public")}
                </Button>
              </div>
            </div>

            {/* Find room */}
            <div className="bg-[#13a8c7] rounded-lg p-3">
              <h4 className="text-2xl font-semibold text-white text-center mb-3">
                {t("joinRoomModal.findRoom")}
              </h4>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder={t("joinRoomModal.codePlaceholder")}
                  className="flex-1 px-3 py-2 rounded text-[#0C1A57] bg-white/90"
                />
                <Button color="gray" size="small" type="submit">
                  {t("joinRoomModal.submit")}
                </Button>
              </div>
            </div>

            {/* Info text */}
            <div className="text-center text-white/90 text-sm">
              {t("joinRoomModal.helper")}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JoinRoomModal;
