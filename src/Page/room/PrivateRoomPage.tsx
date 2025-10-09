import { useState, useEffect, useRef, useMemo } from "react";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "@/Components/Button";
import CancelModal from "./components/CancelModal";
import { getCurrentWorkingPersonalRoom, updateRoomStatus, stopPersonalRoom } from "@/axios/room";
import type { PersonalRoom } from "@/types/room";
import { RoomStatus } from "@/enum/room-status";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
        __CURRENT_AUDIO?: HTMLAudioElement | null;
    }
}

let youtubePlayer: any = null;

// Khởi tạo Audio cho tiếng chuông báo (ting)
const BellSound = typeof window !== 'undefined' ? new Audio('/sounds/ting.mp3') : null;

const PrivateRoomPage = () => {
  const { t } = useTranslation();
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [trackTitle, setTrackTitle] = useState<string>(""); 
  const [trackType, setTrackType] = useState<"file" | "youtube" | null>(null);
  const [trackFile, setTrackFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoomStatus, setCurrentRoomStatus] = useState<RoomStatus | null>(null); 
  const intervalRef = useRef<number | null>(null);
  const isPlayerReady = useRef(false);
  // Sử dụng useRef để lưu trữ trạng thái người dùng có đang chủ động dừng nhạc không
  // Mặc định là false (nhạc tự động chơi theo chu kỳ)
  const isUserPaused = useRef(false); 


  const youtubeId = useMemo(() => {
    return trackType === 'youtube' && trackFile ? trackFile : null;
  }, [trackType, trackFile]);

  // Hàm điều khiển nhạc chung
  const musicControl = (action: 'play' | 'pause') => {
    if (action === 'play') {
      if (trackType === 'file' && audio) {
        audio.play().then(() => setIsPlaying(true)).catch(err => console.warn("Autoplay blocked for audio file:", err));
      } else if (trackType === 'youtube' && youtubePlayer && window.YT) {
        if (youtubePlayer.getPlayerState() !== window.YT.PlayerState.PLAYING) {
            youtubePlayer.playVideo();
        }
      }
    } else { // pause
      if (trackType === 'file' && audio) {
        audio.pause();
        setIsPlaying(false);
      } else if (trackType === 'youtube' && youtubePlayer && window.YT) {
        if (youtubePlayer.getPlayerState() !== window.YT.PlayerState.PAUSED) {
            youtubePlayer.pauseVideo();
        }
      }
    }
  };


  // 1. Tải YouTube Iframe API (Giữ nguyên)
  useEffect(() => {
    if (window.YT && window.YT.Player) {
        return; 
    }
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        document.head.appendChild(tag);
    }
    
    window.onYouTubeIframeAPIReady = () => {
        isPlayerReady.current = true;
        if (youtubeId) {
            initializeYoutubePlayer(youtubeId);
        }
    };
  }, [youtubeId]); 

  const initializeYoutubePlayer = (videoId: string) => {
    if (!window.YT || !isPlayerReady.current) return;
    
    if (youtubePlayer && youtubePlayer.getVideoData().video_id === videoId) {
        return; 
    }

    if (youtubePlayer) {
        youtubePlayer.destroy();
    }

    youtubePlayer = new window.YT.Player('youtube-player', {
        height: '1', 
        width: '1',
        videoId: videoId,
        playerVars: {
            'playsinline': 1,
            'autoplay': 0, 
            'loop': 1,
            'controls': 0, 
            'modestbranding': 1,
            'fs': 0,
            'enablejsapi': 1,
            'rel': 0,
            'showinfo': 0,
            'playlist': videoId, 
        },
        events: {
            'onReady': (event: any) => {
                event.target.setVolume(100); 
            },
            'onStateChange': (event: any) => {
                const YT = window.YT;
                if (event.data === YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                    setIsPlaying(false);
                }
            }
        }
    });
  };

  // 2. Lấy dữ liệu nhạc từ Local Storage và khởi tạo nhạc (Giữ nguyên)
  useEffect(() => {
    const file = localStorage.getItem("selectedTrackFile");
    const title = localStorage.getItem("selectedTrackTitle");
    const type = localStorage.getItem("selectedTrackType") as "file" | "youtube" | null;
    
    setTrackTitle(title || "Không có nhạc");
    setTrackType(type);
    setTrackFile(file);

    if (file && type === "file") {
      if (youtubePlayer) {
        youtubePlayer.stopVideo();
      }
      
      const existing = window.__CURRENT_AUDIO;
      if (existing) {
        setAudio(existing);
      } else {
        const newAudio = new Audio(file);
        newAudio.loop = true;
        setAudio(newAudio);
        window.__CURRENT_AUDIO = newAudio;
      }
    } 
    
    else if (file && type === "youtube") {
      if (window.__CURRENT_AUDIO) {
          window.__CURRENT_AUDIO.pause();
          window.__CURRENT_AUDIO = null;
          setAudio(null);
      }
      
      if (isPlayerReady.current) {
          initializeYoutubePlayer(file);
      }
    } 
    
    else {
        if (window.__CURRENT_AUDIO) {
            window.__CURRENT_AUDIO.pause();
            window.__CURRENT_AUDIO = null;
        }
        if (youtubePlayer) {
            youtubePlayer.stopVideo();
        }
        setAudio(null);
        setIsPlaying(false);
    }

    return () => {
        if (youtubePlayer) {
            youtubePlayer.destroy();
            youtubePlayer = null;
        }
    };
  }, [trackFile, trackType]);

  // 3. Logic điều khiển nhạc ban đầu (CHỈ CHẠY KHI VÀO PHÒNG LẦN ĐẦU)
  // Đảm bảo nhạc chỉ chạy khi trạng thái là ON_WORKING
  useEffect(() => {
    if (currentRoomStatus === RoomStatus.ON_WORKING) {
        if (!isPlaying && !isUserPaused.current) {
             musicControl('play'); 
        }
    } 
    else if (!currentRoomStatus || currentRoomStatus === RoomStatus.STOP) {
        musicControl('pause'); 
    }
    // Khi ở ON_REST/ON_LONG_REST, chúng ta không làm gì cả, để lệnh PAUSE từ updateRoom kiểm soát
  }, [currentRoomStatus, audio, youtubePlayer, trackType]);


  // 4. Cập nhật trạng thái và thời gian còn lại (Giữ nguyên)
  const updateCurrentElapse = async (personalRoom: PersonalRoom) => {
    if (!personalRoom) return;
    
    setCurrentRoomStatus(personalRoom.roomStatus as RoomStatus);

    let duration = personalRoom.focusTime * 60;
    if (personalRoom.roomStatus === RoomStatus.ON_REST)
      duration = personalRoom.shortRestTime * 60;
    else if (personalRoom.roomStatus === RoomStatus.ON_LONG_REST)
      duration = personalRoom.longRestTime * 60;

    const updatedAt = new Date(personalRoom.updatedAt).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - updatedAt) / 1000);
    const remainingTime = Math.max(duration - elapsed, 0);

    setRemaining(remainingTime);
    setRunning(remainingTime > 0);
  };

  const fetchCurrentRoom = async () => {
    try {
      const response = await getCurrentWorkingPersonalRoom();
      if (response.status === 200 && response.data?.result) {
        await updateCurrentElapse(response.data.result);
      }
    } catch (err) {
      console.error("Error fetching room:", err);
    }
  };
  
  // 5. Hàm cập nhật trạng thái phòng và điều khiển âm thanh/nhạc (LOGIC CHÍNH)
  const updateRoom = async () => {
    try {
      const response = await updateRoomStatus();
      
      if (response.status === 200 && response.data?.result) {
        const nextRoomStatus = response.data.result.roomStatus as RoomStatus; 
        
        // 1. PHÁT CHUÔNG BÁO (Ting)
        if (BellSound) {
            BellSound.pause();
            BellSound.currentTime = 0;
            BellSound.play().catch(err => console.warn("Failed to play bell sound:", err));
        }

        // 2. ĐIỀU KHIỂN NHẠC
        // 🚨 Trường hợp 1: Chuyển từ WORKING -> BREAK: TỰ ĐỘNG DỪNG NHẠC
        if (currentRoomStatus === RoomStatus.ON_WORKING && 
            (nextRoomStatus === RoomStatus.ON_REST || nextRoomStatus === RoomStatus.ON_LONG_REST)) 
        {
            // Chỉ dừng nhạc nếu người dùng không chủ động dừng trước đó
            if (!isUserPaused.current) {
                musicControl('pause'); 
            }
        } 
        // 🥳 Trường hợp 2: Chuyển từ BREAK -> WORKING: TỰ ĐỘNG TIẾP TỤC
        else if ((currentRoomStatus === RoomStatus.ON_REST || currentRoomStatus === RoomStatus.ON_LONG_REST) && 
                 nextRoomStatus === RoomStatus.ON_WORKING) 
        {
            // Chỉ tiếp tục nhạc nếu người dùng không chủ động dừng trước đó
            if (!isUserPaused.current) {
                musicControl('play'); 
            }
        }
        // Trường hợp 3: Bắt đầu chu kỳ đầu tiên
        else if ((currentRoomStatus === null || currentRoomStatus === RoomStatus.STOP) && 
                 nextRoomStatus === RoomStatus.ON_WORKING) {
            // Luôn chơi nhạc khi bắt đầu chu kỳ đầu tiên
            isUserPaused.current = false; // Reset trạng thái dừng chủ động
            musicControl('play');
        }

        await updateCurrentElapse(response.data.result);
      }
    } catch (err) {
      console.error("Error update room:", err);
    }
  };

  useEffect(() => {
    fetchCurrentRoom();
  }, []);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          // Gọi updateRoom khi hết giờ
          setTimeout(() => updateRoom(), 200); 
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining, currentRoomStatus]); 

  const handleStop = () => setShowCancel(true);
  const handleConfirmExit = async () => {
    setShowCancel(false);
    setRunning(false);
    
    musicControl('pause');
    isUserPaused.current = false; // Reset

    await stopPersonalRoom();
    window.location.href = "/rooms";
  };

  // LOGIC BẤM NÚT PLAY/PAUSE CỦA NGƯỜI DÙNG
  const togglePlayPause = () => {
    if (isPlaying) {
        musicControl('pause');
        isUserPaused.current = true; // Người dùng chủ động dừng
    } else {
        musicControl('play');
        isUserPaused.current = false; // Người dùng chủ động phát
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      
      {youtubeId && (
        <div id="youtube-player" className="absolute top-0 left-0 opacity-0 w-1 h-1 overflow-hidden" />
      )}

      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {Math.floor(remaining / 60).toString().padStart(2, "0")}:
        {(remaining % 60).toString().padStart(2, "0")}
      </div>

      <span className="text-xl font-semibold mb-4 text-white/90">
        {currentRoomStatus === RoomStatus.ON_WORKING && <>⚡ {t("privateRoom.focus")}</>}
        {(currentRoomStatus === RoomStatus.ON_REST || currentRoomStatus === RoomStatus.ON_LONG_REST) && <>☕ {t("privateRoom.break")}</>}
        {(!currentRoomStatus || currentRoomStatus === RoomStatus.STOP) && <>{t("privateRoom.start")}</>}
      </span>

      <div className="flex flex-col items-center bg-white/80 px-6 py-3 rounded-lg">
        <span className="text-gray-700 text-sm mb-1">
          {trackType === 'youtube' ? '▶️ YouTube Music' : '🎵 ' + (trackTitle || "Không có nhạc")}
        </span>
        
        {(trackType === 'file' && audio) || (trackType === 'youtube' && youtubePlayer) ? (
            <button className="p-1" onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
        ) : (
             <span className="text-xs text-gray-500">{trackType === 'youtube' ? 'Đang tải YouTube...' : 'Không có nhạc/Đã dừng'}</span>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <Button onClick={updateRoom} color="gray" size="wide" disabled={running}> 
          {t("privateRoom.start")}
        </Button>

        <Button onClick={handleStop} color="gray" size="wide" disabled={!running}>
          {t("privateRoom.stop")}
        </Button>
      </div>

      <CancelModal isOpen={showCancel} onOK={handleConfirmExit} onCancel={() => setShowCancel(false)} />
    </div>
  );
};

export default PrivateRoomPage;