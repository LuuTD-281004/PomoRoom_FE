/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPusherClient } from "@/lib/pusher";
import { useAuth } from "@/contexts/AuthContext";
import { getGroupRoomById, leaveRoom, updateRoomStatus } from "@/axios/room";
import { RoomStatus } from "@/enum/room-status";
import type { GroupRoom } from "@/types/room";
import { PlayIcon, PauseIcon } from "lucide-react";
import Button from "@/Components/Button";
import CancelModal from "./components/CancelModal";

declare global {
  interface Window {
    __CURRENT_AUDIO?: HTMLAudioElement | null;
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// YouTube player instance (module-scoped)
let youtubePlayer: any = null;

export default function GroupRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser, accessToken, refreshUser } = useAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(RoomStatus.ON_WORKING);
  const [cycle, setCycle] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [trackType, setTrackType] = useState<"file" | "youtube" | null>(null);
  const [trackFile, setTrackFile] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<GroupRoom | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayerReady = useRef(false);
  const isUserPaused = useRef(false);
  const prevStatusRef = useRef<number | null>(null);
  const prevRunningRef = useRef<boolean | null>(null);
  const privateChannelRef = useRef<any>(null);
  const presenceChannelRef = useRef<any>(null);
  const statusRef = useRef<number>(RoomStatus.ON_WORKING);

  // Bell sound for transitions
  const BellSound =
    typeof window !== "undefined" ? new Audio("/sounds/ting.mp3") : null;

  // ================= FETCH ROOM =================
  const fetchRoom = async () => {
    try {
      if (!roomId) return;
      const response = await getGroupRoomById(roomId);

      if (response.data.result == null) {
        navigate("/rooms");
        return;
      }

      if (response.status === 200 && response.data.result) {
        const room: GroupRoom = response.data.result;
        const roomMembers = (room.participants || [])
          .filter((p) => p.user != null)
          .map((p) => ({
            id: p.userId,
            username: p.user?.username,
          }));
        setMembers(roomMembers);
        setCurrentRoom(room);
        updateRemainingTime(room);
      }
    } catch (err) {
      console.error("Error fetching room:", err);
      navigate("/rooms");
    }
  };

  // ================= QUIT ROOM =================
  const handleQuit = async (userId: string) => {
    if (!currentRoom || !authenticatedUser) return;
    try {
      cleanupAudio();
      if (intervalRef.current) clearInterval(intervalRef.current);
      await leaveRoom(userId);
      navigate("/rooms");
    } catch (err) {
      console.error("Error leaving room:", err);
    }
  };

  // ================= UPDATE TIMER =================
  const updateRemainingTime = (room: GroupRoom) => {
    let duration = room.focusTime * 60;
    if (room.roomStatus === RoomStatus.ON_REST)
      duration = room.shortRestTime * 60;
    else if (room.roomStatus === RoomStatus.ON_LONG_REST)
      duration = room.longRestTime * 60;

    const updatedAt = new Date(room.updatedAt).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - updatedAt) / 1000);
    const remainingTime = Math.max(duration - elapsed, 0);

    setRemaining(remainingTime);
    setStatus(room.roomStatus);
    statusRef.current = room.roomStatus;
    setCycle(room.loopCount || 1);
    setRunning(remainingTime > 0);
  };

  // ================= UPDATE GROUP ROOM STATUS =================
  // Tương tự như Personal Room, gọi API update room status khi timer kết thúc
  const updateGroupRoom = useCallback(async () => {
    try {
      const response = await updateRoomStatus();
      
      if (response.status === 200 && response.data?.result) {
        const nextRoomStatus = response.data.result.roomStatus as RoomStatus;
        const prevStatus = statusRef.current;
        
        // Phát chuông báo
        if (BellSound) {
          BellSound.pause();
          BellSound.currentTime = 0;
          BellSound.play().catch((err) =>
            console.warn("Failed to play bell sound:", err)
          );
        }
        
        // ĐIỀU KHIỂN NHẠC
        // Chuyển từ WORKING -> BREAK: TỰ ĐỘNG DỪNG NHẠC
        if (
          prevStatus === RoomStatus.ON_WORKING &&
          (nextRoomStatus === RoomStatus.ON_REST ||
            nextRoomStatus === RoomStatus.ON_LONG_REST)
        ) {
          if (!isUserPaused.current) {
            if (trackType === "youtube" && youtubePlayer) {
              try {
                youtubePlayer.pauseVideo();
              } catch {}
              setIsPlaying(false);
            } else {
              pauseAudio();
            }
          }
          // Refresh user info để cập nhật số sao sau khi hoàn thành pomodoro
          if (refreshUser) {
            try {
              await refreshUser();
              console.log("Refreshed user info after completing pomodoro in group room");
            } catch (err) {
              console.error("Failed to refresh user info after completing pomodoro:", err);
            }
          }
        }
        // Chuyển từ BREAK -> WORKING: TỰ ĐỘNG TIẾP TỤC NHẠC
        else if (
          (prevStatus === RoomStatus.ON_REST ||
            prevStatus === RoomStatus.ON_LONG_REST) &&
          nextRoomStatus === RoomStatus.ON_WORKING
        ) {
          if (!isUserPaused.current) {
            // Tính youtubeId trực tiếp từ trackType và trackFile
            const currentYoutubeId = trackType === "youtube" && trackFile ? trackFile : null;
            if (trackType === "youtube" && currentYoutubeId && youtubePlayer) {
              try {
                youtubePlayer.playVideo();
                setIsPlaying(true);
              } catch {}
            } else {
              const urlToPlay = trackFile && trackType === "file" ? trackFile : currentTrack;
              // Nếu audio instance đã tồn tại, resume thay vì tạo mới
              if (audioRef.current) {
                audioRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {});
              } else if (urlToPlay) {
                playAudio(urlToPlay);
              }
            }
          }
        }
        
        // Cập nhật status
        setStatus(nextRoomStatus);
        statusRef.current = nextRoomStatus;
      }
    } catch (err) {
      console.error("Error updating group room status:", err);
    }
  }, [refreshUser, trackType, trackFile, currentTrack]);

  // ================= TIMER INTERVAL =================
  useEffect(() => {
    if (!running || remaining <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          
          // Khi timer kết thúc, gọi API update room status (giống Personal Room)
          // Điều này sẽ trigger BE tính sao cho group room
          setTimeout(() => updateGroupRoom(), 200);
          
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining, updateGroupRoom]);

  // ================= PUSHER SETUP =================
  useEffect(() => {
    if (!authenticatedUser || !roomId) return;

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const authPath = import.meta.env.VITE_PUSHER_AUTH_ENDPOINT;
    const pusherAuthEndpoint = `${serverUrl}${authPath}`;

    const pusherClient = getPusherClient({
      appKey: import.meta.env.VITE_APP_KEY,
      cluster: import.meta.env.VITE_CLUSTER,
      authEndpoint: pusherAuthEndpoint,
      authToken: accessToken || "",
    });

    const channel = pusherClient.subscribe(`presence-room-${roomId}`);
    const privateChannel = pusherClient.subscribe(`private-room-${roomId}`);
    presenceChannelRef.current = channel;
    privateChannelRef.current = privateChannel;

    privateChannel.bind("room-creator-leave", (data: any) => {
      console.log("Creator left room:", data);
      handleQuit(authenticatedUser.id);
    });

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      const list: any[] = [];
      members.each((member: any) => {
        list.push({ id: member.id, username: member.info.name });
      });
      setMembers(list);
    });

    channel.bind("pusher:member_added", (member: any) => {
      setMembers((prev) => [
        ...prev,
        { id: member.id, username: member.info.name },
      ]);
      // After someone joins, if we already have media config locally, broadcast it so they sync
      setTimeout(() => {
        try {
          const type = localStorage.getItem("selectedTrackType");
          const file = localStorage.getItem("selectedTrackFile");
          const bg = localStorage.getItem("selectedBg");
          if (type && file) {
            privateChannel.trigger("client-media-config", {
              type,
              file,
              bg,
            });
          }
        } catch {}
      }, 300);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      handleQuit(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    channel.bind("room_status_changed", async (data: any) => {
      const newStatus = parseInt(data.status);
      const prevStatus = statusRef.current;
      
      setStatus(newStatus);
      statusRef.current = newStatus;
      setCycle(data.cycle);
      setRemaining(parseInt(data.remaining) / 1000);
      setRunning(true);
      
      // Nếu chuyển từ ON_WORKING sang ON_REST hoặc ON_LONG_REST
      // Đây là lúc hoàn thành 25 phút pomodoro, BE có thể đã tính sao
      if (
        prevStatus === RoomStatus.ON_WORKING &&
        (newStatus === RoomStatus.ON_REST || newStatus === RoomStatus.ON_LONG_REST)
      ) {
        // Refresh user info để cập nhật số sao sau khi hoàn thành pomodoro
        if (refreshUser) {
          try {
            await refreshUser();
          } catch (err) {
            console.error("Failed to refresh user info after completing pomodoro:", err);
          }
        }
      }
    });

    // Receive media config from room creator/any member who has configuration
    privateChannel.bind("client-media-config", (data: any) => {
      try {
        const incomingType = data?.type as "file" | "youtube" | null;
        const incomingFile = data?.file as string | null;
        const incomingBg = data?.bg as string | null;

        // Persist and apply only if we don't already have a config
        if (!trackType && incomingType) {
          localStorage.setItem("selectedTrackType", incomingType);
          setTrackType(incomingType);
        }
        if (!trackFile && incomingFile) {
          localStorage.setItem("selectedTrackFile", incomingFile);
          setTrackFile(incomingFile);
          if (incomingType === "file") {
            // Prepare audio element for resume behavior
            if (!audioRef.current) {
              const newAudio = new Audio(incomingFile);
              newAudio.loop = true;
              newAudio.volume = 0.3;
              audioRef.current = newAudio;
              window.__CURRENT_AUDIO = newAudio;
            }
          } else if (incomingType === "youtube") {
            // Will be handled by youtubeId memo + initializer
          }
        }
        if (!backgroundUrl && incomingBg) {
          localStorage.setItem("selectedBg", incomingBg);
          setBackgroundUrl(incomingBg);
        }
      } catch {}
    });

    return () => {
      try {
        // Kiểm tra xem Pusher client còn active không trước khi cleanup
        if (pusherClient && pusherClient.connection && pusherClient.connection.state !== 'disconnected') {
          if (presenceChannelRef.current) {
            pusherClient.unsubscribe(`presence-room-${roomId}`);
          }
          if (privateChannelRef.current) {
            pusherClient.unsubscribe(`private-room-${roomId}`);
          }
          // Chỉ disconnect nếu chưa disconnected
          if (pusherClient.connection.state !== 'disconnected' && pusherClient.connection.state !== 'disconnecting') {
            pusherClient.disconnect();
          }
        }
      } catch (err) {
        // Ignore errors during cleanup
        console.warn("Error during Pusher cleanup:", err);
      }
    };
  }, [roomId, authenticatedUser, accessToken]);

  // ================= INIT ROOM =================
  useEffect(() => {
    fetchRoom();
    // Backward-compat single key
    const savedTrack = localStorage.getItem("selectedTrack");
    if (savedTrack) setCurrentTrack(savedTrack);

    // New playlist keys (aligned with PrivateRoomPage)
    const file = localStorage.getItem("selectedTrackFile");
    const type = localStorage.getItem("selectedTrackType") as
      | "file"
      | "youtube"
      | null;

    setTrackType(type);
    setTrackFile(file);

    const bgUrl = localStorage.getItem("selectedBg");
    if (bgUrl) setBackgroundUrl(bgUrl);

    return () => {
      cleanupAudio();
      if (youtubePlayer && typeof youtubePlayer.destroy === "function") {
        youtubePlayer.destroy();
        youtubePlayer = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [roomId]);

  // Determine youtubeId from stored values or pasted link
  const youtubeId = useMemo(() => {
    if (trackType === "youtube" && trackFile) return trackFile;
    if (currentTrack && /(youtube\.com|youtu\.be)/i.test(currentTrack)) {
      // Parse ID from url
      try {
        const url = new URL(currentTrack);
        if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
        const v = url.searchParams.get("v");
        if (v) return v;
      } catch {}
    }
    return null;
  }, [trackType, trackFile, currentTrack]);

  // Load YouTube Iframe API once and init player when id available
  useEffect(() => {
    if (!youtubeId) return;

    if (window.YT && window.YT.Player) {
      isPlayerReady.current = true;
      initializeYoutubePlayer(youtubeId);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      isPlayerReady.current = true;
      initializeYoutubePlayer(youtubeId);
    };
  }, [youtubeId]);

  const initializeYoutubePlayer = (videoId: string) => {
    if (!window.YT || !isPlayerReady.current) return;

    if (
      youtubePlayer &&
      typeof youtubePlayer.getVideoData === "function" &&
      youtubePlayer.getVideoData().video_id === videoId
    ) {
      return;
    }

    if (youtubePlayer && typeof youtubePlayer.destroy === "function") {
      youtubePlayer.destroy();
    }

    youtubePlayer = new window.YT.Player("group-youtube-player", {
      height: "1",
      width: "1",
      videoId,
      playerVars: {
        playsinline: 1,
        autoplay: 0,
        loop: 1,
        controls: 0,
        modestbranding: 1,
        fs: 0,
        enablejsapi: 1,
        rel: 0,
        showinfo: 0,
        playlist: videoId,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(100);
          if (status === RoomStatus.ON_WORKING && !isUserPaused.current) {
            try {
              event.target.playVideo();
            } catch {}
          }
        },
        onStateChange: (event: any) => {
          const YT = window.YT;
          if (event.data === YT.PlayerState.PLAYING) setIsPlaying(true);
          if (
            event.data === YT.PlayerState.PAUSED ||
            event.data === YT.PlayerState.ENDED
          )
            setIsPlaying(false);
        },
      },
    });
  };

  // ================= AUDIO HANDLERS =================
  const playAudio = (url: string) => {
    stopAudio();
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    window.__CURRENT_AUDIO = audio;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => console.warn("Audio autoplay blocked."));
  };

  // Pause without resetting position (for breaks)
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (window.__CURRENT_AUDIO) {
      window.__CURRENT_AUDIO.pause();
    }
    setIsPlaying(false);
  };

  // Fully stop and reset (for leaving/cleanup)
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.__CURRENT_AUDIO) {
      window.__CURRENT_AUDIO.pause();
      window.__CURRENT_AUDIO.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const cleanupAudio = () => {
    stopAudio();
    audioRef.current = null;
    if (window.__CURRENT_AUDIO) window.__CURRENT_AUDIO = null;
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    // Prefer explicit trackType if available
    if (trackType === "youtube" && youtubeId && youtubePlayer) {
      if (isPlaying) {
        try {
          youtubePlayer.pauseVideo();
        } catch {}
        isUserPaused.current = true;
        setIsPlaying(false);
      } else {
        try {
          youtubePlayer.playVideo();
        } catch {}
        isUserPaused.current = false;
      }
      return;
    }

    const urlToPlay = trackFile && trackType === "file" ? trackFile : currentTrack;
    if (!urlToPlay) return;
    if (isPlaying) {
      stopAudio();
      isUserPaused.current = true;
    } else {
      playAudio(urlToPlay);
      isUserPaused.current = false;
    }
  };

  // ================= AUTO PLAY / STOP NHẠC THEO ROOM STATUS =================
  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const prevRunning = prevRunningRef.current;

    // Update refs for next run
    prevStatusRef.current = status;
    prevRunningRef.current = running;

    // Handle running toggles
    if (prevRunning !== running) {
      if (!running) {
        // Avoid pausing immediately on transient sync; wait for explicit status change
        return;
      }
      // Timer just started → fall through to status handling
    }

    // Only react when status actually changes
    if (prevStatus === status) return;

    if (status === RoomStatus.ON_WORKING && running) {
      // bell on transition
      if (BellSound) {
        try {
          BellSound.pause();
          BellSound.currentTime = 0;
          BellSound.play();
        } catch {}
      }
      if (trackType === "youtube" && youtubeId && youtubePlayer) {
        if (!isUserPaused.current) {
          try {
            youtubePlayer.playVideo();
          } catch {}
        }
      } else {
        const urlToPlay = trackFile && trackType === "file" ? trackFile : currentTrack;
        // If an audio instance already exists, resume instead of recreating
        if (audioRef.current && !isUserPaused.current) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else if (urlToPlay && !isUserPaused.current) {
          playAudio(urlToPlay);
        }
      }
    } else if (
      status === RoomStatus.ON_REST ||
      status === RoomStatus.ON_LONG_REST
    ) {
      if (!isUserPaused.current) {
        // bell on transition
        if (BellSound) {
          try {
            BellSound.pause();
            BellSound.currentTime = 0;
            BellSound.play();
          } catch {}
        }
        if (trackType === "youtube" && youtubePlayer) {
          try {
            youtubePlayer.pauseVideo();
          } catch {}
          setIsPlaying(false);
        } else {
          pauseAudio();
        }
      }
    }
  }, [status, running, currentTrack, trackType, trackFile, youtubeId]);

  // ================= FORMAT TIME =================
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ================= RENDER UI =================
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : "none",
        backgroundColor: !backgroundUrl ? "#0C1A57" : undefined,
      }}
    >
      {youtubeId && (
        <div
          id="group-youtube-player"
          className="absolute top-0 left-0 opacity-0 w-1 h-1 overflow-hidden"
        />
      )}
      <div className="text-8xl font-bold mb-8 text-white bg-blue-400/80 px-20 py-10 rounded-lg">
        {formatTime(remaining)}
      </div>

      <div className="flex items-center gap-4 bg-white/80 px-6 py-3 rounded-lg mb-6">
        <span className="text-gray-700 font-semibold">
          {status === RoomStatus.ON_WORKING
            ? "🧠 Focus Time"
            : status === RoomStatus.ON_REST
            ? "☕ Short Break"
            : "🏖️ Long Break"}{" "}
          — Cycle {cycle}
        </span>

        {(currentTrack || youtubeId) && (
          <button
            onClick={toggleAudio}
            className="p-2 bg-blue-200 rounded-full hover:bg-blue-300 transition"
          >
            {isPlaying ? (
              <PauseIcon size={20} className="text-blue-700" />
            ) : (
              <PlayIcon size={20} className="text-blue-700" />
            )}
          </button>
        )}

        <Button onClick={() => setShowCancelModal(true)}>Leave</Button>
      </div>

      <div className="bg-white/80 rounded-lg p-4 w-full max-w-md">
        <h3 className="font-semibold mb-2 text-gray-800">👥 Online Members</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {members.map((member) => (
            <li key={member.id}>{member.username}</li>
          ))}
        </ul>
      </div>

      <CancelModal
        isOpen={showCancelModal}
        onOK={() => {
          setShowCancelModal(false);
          handleQuit(authenticatedUser?.id || "");
        }}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
}
