/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPusherClient } from "@/lib/pusher";
import { useAuth } from "@/contexts/AuthContext";
import { getGroupRoomById, leaveRoom } from "@/axios/room";
import { RoomStatus } from "@/enum/room-status";
import type { GroupRoom } from "@/types/room";
import { PlayIcon, PauseIcon } from "lucide-react";
import Button from "@/Components/Button";
import CancelModal from "./components/CancelModal";

declare global {
  interface Window {
    __CURRENT_AUDIO?: HTMLAudioElement | null;
  }
}

export default function GroupRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { authenticatedUser, accessToken } = useAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(RoomStatus.ON_WORKING);
  const [cycle, setCycle] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<GroupRoom | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Thay navigate bằng reload
    window.location.reload();
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
    setCycle(room.loopCount || 1);
    setRunning(remainingTime > 0);
  };

  // ================= TIMER INTERVAL =================
  useEffect(() => {
    if (!running || remaining <= 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

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
    });

    channel.bind("pusher:member_removed", (member: any) => {
      handleQuit(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    channel.bind("room_status_changed", (data: any) => {
      setStatus(parseInt(data.status));
      setCycle(data.cycle);
      setRemaining(parseInt(data.remaining) / 1000);
      setRunning(true);
    });

    return () => {
      pusherClient.unsubscribe(`private-room-${roomId}`);
      pusherClient.unsubscribe(`presence-room-${roomId}`);
      pusherClient.disconnect();
    };
  }, [roomId, authenticatedUser]);

  // ================= INIT ROOM =================
  useEffect(() => {
    fetchRoom();
    const savedTrack = localStorage.getItem("selectedTrack");
    if (savedTrack) setCurrentTrack(savedTrack);

    return () => {
      cleanupAudio();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [roomId]);

  // ================= AUDIO HANDLERS =================
  const playAudio = (url: string) => {
    stopAudio();
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    window.__CURRENT_AUDIO = audio;
    audio.play().then(() => setIsPlaying(true)).catch(() => console.warn("Audio autoplay blocked."));
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.__CURRENT_AUDIO) {
      window.__CURRENT_AUDIO.pause();
      window.__CURRENT_AUDIO.currentTime = 0;
      window.__CURRENT_AUDIO = null;
    }
    setIsPlaying(false);
  };

  const cleanupAudio = () => {
    stopAudio();
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (!currentTrack) return;
    if (isPlaying) stopAudio();
    else playAudio(currentTrack);
  };

  // ================= AUTO PLAY / STOP NHẠC THEO ROOM STATUS =================
  useEffect(() => {
    if (!currentTrack) return;

    if (!running || remaining <= 0) {
      stopAudio(); // nếu timer dừng → stop
      return;
    }

    if (status === RoomStatus.ON_WORKING) {
      if (!isPlaying) playAudio(currentTrack);
    } else if (status === RoomStatus.ON_REST || status === RoomStatus.ON_LONG_REST) {
      if (isPlaying) stopAudio();
    }
  }, [status, running, remaining, currentTrack]);

  // ================= FORMAT TIME =================
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ================= RENDER UI =================
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
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

        {currentTrack && (
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
