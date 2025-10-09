import React, { useState, useRef, useEffect } from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, PlayIcon, PauseIcon } from "lucide-react";

declare global {
  interface Window {
    __CURRENT_AUDIO?: HTMLAudioElement | null;
  }
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onTrackSelect?: (track: { title: string; file: string }, staticBg?: number | null) => void;
};

type Track = {
  title: string;
  file: string;
  artist: string;
  duration: string;
};

const TRACKS: Track[] = [
  { title: "Estro", file: "/sounds/bensoundEstro.mp3", artist: "Bensound", duration: "2:59" },
  { title: "Healing", file: "/sounds/healing.mp3", artist: "Unknown", duration: "3:12" },
  { title: "June Time", file: "/sounds/juneTime.mp3", artist: "Unknown", duration: "2:45" },
  { title: "Natural Sleep", file: "/sounds/naturalSleepMusic.mp3", artist: "Unknown", duration: "4:01" },
  { title: "Rain", file: "/sounds/rain.mp3", artist: "Unknown", duration: "3:30" },
  { title: "Solo Piano", file: "/sounds/soloPiano.mp3", artist: "Unknown", duration: "3:15" },
];

const STATIC_PREVIEWS = [1, 2, 3, 4, 5, 6];

function formatTime(sec: number) {
  if (!isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const PlaylistModal: React.FC<Props> = ({ isOpen, onClose, onTrackSelect }) => {
  const { t } = useTranslation();
  const [previewTrack, setPreviewTrack] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>(TRACKS[0].file);
  const [selectedBg, setSelectedBg] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  

  useEffect(() => {
    if (isOpen) {
      setSelectedTrack(TRACKS[0].file);
      setPreviewTrack(null);
      setSelectedBg(null);
      setSearch("");
      setAudioProgress(0);
      setAudioDuration(0);
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime || 0);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  useEffect(() => {
    setAudioProgress(0);
    setAudioDuration(0);
    if (previewTrack && audioRef.current) {
      audioRef.current.src = previewTrack;
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [previewTrack]);

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setPreviewTrack(null);
    }
  }, [isOpen]);

  const handlePlayPause = (trackFile: string) => {
    if (previewTrack === trackFile) {
      if (audioRef.current?.paused) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current?.pause();
      }
    } else {
      setPreviewTrack(trackFile);
    }
  };

  const isPlaying = (trackFile: string) =>
    previewTrack === trackFile && !audioRef.current?.paused;

  const filteredTracks = TRACKS.filter(
    (track) =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = async () => {
    const selected = TRACKS.find((t) => t.file === selectedTrack);
    if (!selected) return alert("No track selected");

    // 🔹 Lưu đúng key trong localStorage
    localStorage.setItem("selectedTrackFile", selected.file);
    localStorage.setItem("selectedTrackTitle", selected.title);
    localStorage.setItem("selectedBg", selectedBg ? String(selectedBg) : "");

    try {
      const newAudio = new Audio(selected.file);
      newAudio.loop = true;
      await newAudio.play();
      window.__CURRENT_AUDIO = newAudio;
    } catch (err) {
      console.warn("Autoplay may be blocked:", err);
    }

    if (onTrackSelect) onTrackSelect({ title: selected.title, file: selected.file }, selectedBg);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("playlistModal.title")}>
      <div className="w-[980px] max-w-full">
        <div className="flex">
          {/* LEFT - tracks */}
          <div className="flex-1 bg-[#0C2350] rounded-l-lg p-6 text-white border-r border-white/30">
            <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-2">
              {t("playlistModal.addFavorite")}
            </h3>

            <div className="mb-4 flex items-center gap-3 border-b border-white/20 pb-4">
              <div className="flex-1">
                <input
                  className="w-full px-3 py-2 rounded-md outline-none bg-white text-[#0C1A57]"
                  placeholder={t("playlistModal.youtubePlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="px-4 py-2 bg-white text-[#0C1A57] rounded-md" disabled>
                {t("playlistModal.search")}
              </button>
            </div>

            <div className="mb-3 flex items-center gap-2 border-b border-white/20 pb-2">
              <span className="text-lg font-semibold">{t("playlistModal.default")}</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {filteredTracks.map((tItem) => (
                <div
                  key={tItem.title}
                  className={`flex flex-col bg-white/10 rounded-md px-4 py-3 text-sm border-2 ${
                    selectedTrack === tItem.file ? "border-blue-400" : "border-transparent"
                  }`}
                  onClick={() => setSelectedTrack(tItem.file)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center text-xs text-slate-700">
                        🎵
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white">{tItem.title}</div>
                        <div className="text-slate-300 text-xs">{tItem.artist}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-slate-300 text-xs">{tItem.duration}</div>
                      <button
                        className="text-xs text-[#0C1A57] bg-white/10 px-3 py-1 rounded-md flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause(tItem.file);
                        }}
                        type="button"
                      >
                        {isPlaying(tItem.file) ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                      </button>
                      <span
                        className={`ml-2 w-3 h-3 rounded-full border-2 ${
                          selectedTrack === tItem.file ? "border-blue-400 bg-blue-400" : "border-white/30"
                        }`}
                      />
                    </div>
                  </div>

                  {previewTrack === tItem.file && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white min-w-[40px]">{formatTime(audioProgress)}</span>
                      <div className="flex-1 h-2 bg-white/20 rounded overflow-hidden relative">
                        <div
                          className="h-full bg-blue-400 transition-all"
                          style={{
                            width: audioDuration > 0 ? `${(audioProgress / audioDuration) * 100}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-xs text-white min-w-[40px]">{formatTime(audioDuration)}</span>
                    </div>
                  )}
                </div>
              ))}
              <audio
                ref={audioRef}
                src={previewTrack || undefined}
                autoPlay
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={() => setPreviewTrack(null)}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* RIGHT - backgrounds */}
          <div className="flex-1 bg-[#072147] rounded-r-lg p-6 text-white flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-semibold">{t("themeModal.staticBg")}</div>
                <div className="flex items-center gap-2 text-sm text-white/80 opacity-50">
                  <ArrowLeft size={16} />
                  <ArrowRight size={16} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {STATIC_PREVIEWS.map((p) => (
                  <button
                    key={p}
                    className={`bg-white/5 rounded-lg w-full h-32 p-2 flex flex-col items-center gap-2 hover:scale-[1.02] transition border-2 ${
                      selectedBg === p ? "border-blue-400" : "border-transparent"
                    }`}
                    onClick={() => setSelectedBg(selectedBg === p ? null : p)}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-sky-300/20 to-sky-100/20 rounded-md flex items-center justify-center">
                      <span className="text-xs text-slate-400">Nền {p}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto flex justify-end">
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
                onClick={handleConfirm}
                disabled={!selectedTrack}
              >
                {t("playlistModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlaylistModal;
