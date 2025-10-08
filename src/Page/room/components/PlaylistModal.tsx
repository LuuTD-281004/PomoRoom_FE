import React from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const STATIC_PREVIEWS = [1, 2, 3, 4, 5, 6];

export const PlaylistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("playlistModal.title")}>
      <div className="w-[980px] max-w-full">
        <div className="flex">
          <div className="flex-1 bg-[#0C2350] rounded-l-lg p-6 text-white border-r border-white/30">
            <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-2">
              {t("playlistModal.addFavorite")}
            </h3>

            <div className="mb-4 flex items-center gap-3 border-b border-white/20 pb-4">
              <div className="flex-1">
                <input
                  className="w-full px-3 py-2 rounded-md outline-none bg-white text-[#0C1A57]"
                  placeholder={t("playlistModal.youtubePlaceholder")}
                />
              </div>
              <button className="px-4 py-2 bg-white text-[#0C1A57] rounded-md">
                {t("playlistModal.search")}
              </button>
            </div>

            <div className="mb-3 flex items-center gap-2 border-b border-white/20 pb-2">
              <span className="text-lg font-semibold">
                {t("playlistModal.default")}
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {TRACKS.map((tItem) => (
                <div
                  key={tItem.title}
                  className="flex items-center justify-between bg-white/10 rounded-md px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center text-xs text-slate-700">
                      thumbnail
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{tItem.title}</div>
                      <div className="text-slate-300 text-xs">{tItem.artist}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-slate-300 text-xs">{tItem.duration}</div>
                    <button className="text-xs text-[#0C1A57] bg-white/10 px-3 py-1 rounded-md">
                      {t("playlistModal.play")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#072147] rounded-r-lg p-6 text-white">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">
                  {t("themeModal.staticBg")}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <button className="bg-white/10 rounded flex items-center justify-center p-1">
                    <ArrowLeft className="!text-[#0C1A57] size-4" />
                  </button>
                  <button className="bg-white/10 rounded flex items-center justify-center p-1">
                    <ArrowRight className="!text-[#0C1A57] size-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {STATIC_PREVIEWS.map((p) => (
                  <button
                    key={`static-${p}`}
                    className="bg-white/5 rounded-lg w-full h-32 p-2 flex flex-col items-center gap-2 hover:scale-[1.02] transition"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-sky-300/20 to-sky-100/20 rounded-md" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistModal;
