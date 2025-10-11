import React, { useState, useRef, useEffect } from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { PlayIcon, PauseIcon, X } from "lucide-react";
import { getAllBackgrounds } from "@/axios/files";

declare global {
  interface Window {
    __CURRENT_AUDIO?: HTMLAudioElement | null;
  }
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onTrackSelect?: (
    track: { title: string; file: string; type: "file" | "youtube" },
    staticBg?: string | null
  ) => void;
};

type Track = {
  title: string;
  file: string;
  artist: string;
  duration: string;
};

type Background = {
  id: string;
  name: string | null;
  filePath: string;
  isPremium: boolean;
  stars: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

const TRACKS: Track[] = [
  {
    title: "Estro",
    file: "/sounds/bensoundEstro.mp3",
    artist: "",
    duration: "3:12",
  },
  {
    title: "Healing",
    file: "/sounds/healing.mp3",
    artist: "",
    duration: "3:52",
  },
  {
    title: "June Time",
    file: "/sounds/juneTime.mp3",
    artist: "",
    duration: "2:36",
  },
  {
    title: "Natural Sleep",
    file: "/sounds/naturalSleepMusic.mp3",
    artist: "",
    duration: "2:18",
  },
  { title: "Rain", file: "/sounds/rain.mp3", artist: "", duration: "1:20" },
  {
    title: "Solo Piano",
    file: "/sounds/soloPiano.mp3",
    artist: "",
    duration: "1:03",
  },
];

function formatTime(sec: number) {
  if (!isFinite(sec)) return "00:00";
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

const extractYouTubeID = (url: string) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const PlaylistModal: React.FC<Props> = ({ isOpen, onClose, onTrackSelect }) => {
  const { t } = useTranslation();
  const [previewTrack, setPreviewTrack] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [search, setSearch] = useState("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string | null>(
    TRACKS[0].file
  );
  const [selectedType, setSelectedType] = useState<"file" | "youtube">("file");
  const [selectedBg, setSelectedBg] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedTrack(TRACKS[0].file);
      setSelectedType("file");
      setPreviewTrack(null);
      setSelectedBg(null);
      setSearch("");
      setYoutubeLink("");
      setAudioProgress(0);
      setAudioDuration(0);

      getAllBackgrounds()
        .then((res) => {
          setBackgrounds(res.result || []);
        })
        .catch(() => setBackgrounds([]));
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime || 0);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  useEffect(() => {
    if (selectedType === "youtube" && youtubeLink) {
      setPreviewTrack(null);
    }

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
  }, [previewTrack, selectedType, youtubeLink]);

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setPreviewTrack(null);
    }
  }, [isOpen]);

  const handlePlayPause = (trackFile: string) => {
    if (selectedType === "youtube") return;

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

  const handleSelectTrack = (trackFile: string) => {
    setYoutubeLink("");
    setSelectedTrack(trackFile);
    setSelectedType("file");
  };

  const handleYoutubeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setYoutubeLink(link);
    setSearch("");

    const youtubeID = extractYouTubeID(link);
    if (link && youtubeID) {
      setSelectedTrack(youtubeID);
      setSelectedType("youtube");
      setPreviewTrack(null);
    } else if (link && !youtubeID) {
      setSelectedTrack(null);
      setSelectedType("file");
      setPreviewTrack(null);
    } else {
      setSelectedTrack(TRACKS[0].file);
      setSelectedType("file");
    }
  };

  const handleClearYoutubeLink = () => {
    setYoutubeLink("");
    setSelectedTrack(TRACKS[0].file);
    setSelectedType("file");
  };

  const handleConfirm = async () => {
    let finalTrack: { title: string; file: string; type: "file" | "youtube" };

    const youtubeID = extractYouTubeID(youtubeLink);
    if (youtubeLink && youtubeID) {
      finalTrack = {
        title: "YouTube: " + youtubeID,
        file: youtubeID,
        type: "youtube",
      };
    } else {
      const selected = TRACKS.find((t) => t.file === selectedTrack);
      if (!selected) {
        alert(t("playlistModal.noTrackSelected") || "No track selected");
        return;
      }
      finalTrack = {
        title: selected.title,
        file: selected.file,
        type: "file",
      };
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (window.__CURRENT_AUDIO) {
      window.__CURRENT_AUDIO.pause();
      window.__CURRENT_AUDIO = null;
    }

    // Logic mới để lấy đường dẫn background
    const selectedBackground = backgrounds.find(bg => bg.id === selectedBg);
    const selectedBgPath = selectedBackground ? selectedBackground.filePath : "";

    localStorage.setItem("selectedTrackFile", finalTrack.file);
    localStorage.setItem("selectedTrackTitle", finalTrack.title);
    localStorage.setItem("selectedTrackType", finalTrack.type);
    localStorage.setItem("selectedBg", selectedBgPath); // Lưu đường dẫn background

    if (finalTrack.type === "file") {
      try {
        const newAudio = new Audio(finalTrack.file);
        newAudio.loop = true;
        await newAudio.play();
        window.__CURRENT_AUDIO = newAudio;
      } catch (err) {
        console.warn("Autoplay may be blocked:", err);
      }
    }

    if (onTrackSelect) onTrackSelect(finalTrack, selectedBgPath); // Gửi đường dẫn background qua props

    onClose();
  };

  const isYoutubeValid = youtubeLink && extractYouTubeID(youtubeLink);
  const isYoutubeSelected = selectedType === "youtube" && isYoutubeValid;
  const isFileSelected = selectedType === "file" && selectedTrack;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("playlistModal.title")}>
      <div className="w-[980px] max-w-full">
        <div className="flex">
          {/* LEFT - tracks */}
          <div className="flex-1 bg-[#0C2350] rounded-l-lg p-6 text-white border-r border-white/30">
            <h3 className="text-xl font-semibold mb-3 border-b border-white/30 pb-2">
              {t("playlistModal.addFavorite")}
            </h3>

            {/* Input YouTube Link (Đã ẩn label và thông báo ID) */}
            <div className="mb-4 flex flex-col gap-2 border-b border-white/20 pb-4">
              {/* LABEL ĐÃ ẨN */}
              <div className="flex items-center gap-2">
                <input
                  className="w-full px-3 py-2 rounded-md outline-none bg-white text-[#0C1A57] disabled:opacity-50"
                  placeholder={t("playlistModal.youtubePlaceholder")}
                  value={youtubeLink}
                  onChange={handleYoutubeInputChange}
                />
                {youtubeLink && (
                  <button
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                    onClick={handleClearYoutubeLink}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {/* THÔNG BÁO ID ĐÃ ẨN */}
              {youtubeLink && !isYoutubeValid && (
                <div className="text-sm text-red-400 mt-1">
                  ❌ Link YouTube không hợp lệ
                </div>
              )}
            </div>

            <div className="mb-3 flex items-center gap-2 border-b border-white/20 pb-2">
              <span className="text-lg font-semibold">
                {t("playlistModal.default")}
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {filteredTracks.map((tItem) => (
                <div
                  key={tItem.title}
                  className={`flex flex-col bg-white/10 rounded-md px-4 py-3 text-sm border-2 ${
                    isFileSelected && selectedTrack === tItem.file
                      ? "border-blue-400"
                      : "border-transparent"
                  } ${
                    isYoutubeSelected
                      ? "opacity-50 pointer-events-none"
                      : "cursor-pointer"
                  }`}
                  onClick={() => handleSelectTrack(tItem.file)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-300 to-sky-100 flex items-center justify-center text-xs text-slate-700">
                        🎵
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white">
                          {tItem.title}
                        </div>
                        <div className="text-slate-300 text-xs">
                          {tItem.artist}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-slate-300 text-xs">
                        {tItem.duration}
                      </div>
                      <button
                        className="text-xs text-[#0C1A57] bg-white/10 px-3 py-1 rounded-md flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause(tItem.file);
                        }}
                        type="button"
                        disabled={!!isYoutubeSelected}
                      >
                        {isPlaying(tItem.file) ? (
                          <PauseIcon color="white" size={16} />
                        ) : (
                          <PlayIcon color="white" size={16} />
                        )}
                      </button>
                      <span
                        className={`ml-2 w-3 h-3 rounded-full border-2 ${
                          isFileSelected && selectedTrack === tItem.file
                            ? "border-blue-400 bg-blue-400"
                            : "border-white/30"
                        }`}
                      />
                    </div>
                  </div>

                  {previewTrack === tItem.file && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white min-w-[40px]">
                        {formatTime(audioProgress)}
                      </span>
                      <div className="flex-1 h-2 bg-white/20 rounded overflow-hidden relative">
                        <div
                          className="h-full bg-blue-400 transition-all"
                          style={{
                            width:
                              audioDuration > 0
                                ? `${(audioProgress / audioDuration) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                      <span className="text-xs text-white min-w-[40px]">
                        {formatTime(audioDuration)}
                      </span>
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
                <div className="text-lg font-semibold">
                  {t("themeModal.staticBg")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    className={`bg-white/5 rounded-lg w-full h-32 p-2 flex flex-col items-center gap-2 hover:scale-[1.02] transition border-2 ${
                      selectedBg === bg.id
                        ? "border-blue-400"
                        : "border-transparent"
                    }`}
                    onClick={() =>
                      setSelectedBg(selectedBg === bg.id ? null : bg.id)
                    }
                  >
                    <div className="w-full h-full rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={bg.filePath}
                        alt={bg.name || "background"}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    {bg.isPremium && (
                      <span className="text-xs text-yellow-300 font-semibold mt-1">
                        Premium
                      </span>
                    )}
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