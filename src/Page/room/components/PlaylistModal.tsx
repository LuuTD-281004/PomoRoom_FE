import React from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const ambientOptions = t("playlistModal.ambientOptions", {
    returnObjects: true,
  }) as string[];

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

          <div className="w-80 flex flex-col">
            <div className="bg-[#072147] rounded-tr-lg p-5 text-white border-b border-white/30">
              <h4 className="text-lg font-semibold text-center mb-3 border-b border-white/20 pb-2">
                {t("playlistModal.volume")}
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300">
                    {t("playlistModal.music")}
                  </label>
                  <input type="range" min={0} max={100} defaultValue={30} className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-slate-300">
                    {t("playlistModal.sound")}
                  </label>
                  <input type="range" min={0} max={100} defaultValue={50} className="w-full" />
                </div>
              </div>
            </div>

            <div className="bg-[#072147] p-5 text-white border-b border-white/30 flex-1">
              <h4 className="text-lg font-semibold text-center mb-3 border-b border-white/20 pb-2">
                {t("playlistModal.ambients")}
              </h4>
              <p className="text-sm text-slate-300 text-center mb-3">
                {t("playlistModal.ambientsDesc")}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {ambientOptions.map((name) => (
                  <button
                    key={name}
                    className="flex flex-col items-center gap-2 bg-white/5 rounded-md p-3 hover:bg-white/10 transition"
                  >
                    <div className="text-sm text-[#0C1A57]">{name}</div>
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
