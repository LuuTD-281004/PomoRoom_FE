import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPusherClient } from "@/lib/pusher";
import { useAuth } from "@/contexts/AuthContext";

export default function GroupRoomPage() {
  const { roomId } = useParams();
  const token = localStorage.getItem("access_token");
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("focus");
  const [cycle, setCycle] = useState(1);
  const [remaining, setRemaining] = useState(25 * 60);
  const intervalRef = useRef<number | null>(null);
  const { authenticatedUser, accessToken } = useAuth();

  // countdown handler
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRemaining((r) => Math.max(r - 1, 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!authenticatedUser) return;
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const pusher = import.meta.env.VITE_PUSHER_AUTH_ENDPOINT;
    const pusherAuthEndpoint = `${serverUrl}${pusher}`;

    const pusherClient = getPusherClient({
      appKey: import.meta.env.VITE_APP_KEY,
      cluster: import.meta.env.VITE_CLUSTER,
      authEndpoint: pusherAuthEndpoint,
      authToken: accessToken || "",
    });

    const channel = pusherClient.subscribe(`presence-room-${roomId}`);

    channel.bind("pusher:member_added", (member) => {
      setMembers((prev) => [...prev, member.info]);
    });

    channel.bind("pusher:member_removed", (member) => {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    });

    channel.bind("room_status_changed", (data) => {
      setStatus(data.status);
      setCycle(data.cycle);
      setRemaining(
        data.status === "focus" ? 25 * 60 : data.cycle === 4 ? 15 * 60 : 5 * 60
      );
    });

    return () => {
      pusher.unsubscribe(`presence-room-${roomId}`);
      pusher.disconnect();
    };
  }, [roomId, token]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2 text-center">Pomodoro Group</h2>

      <div className="text-center mb-6">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            status === "focus"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {status === "focus" ? "🧠 Focus Time" : "☕ Break"} — Cycle {cycle}
        </span>
        <div className="text-4xl font-mono mt-3">{formatTime(remaining)}</div>
      </div>

      <h3 className="font-semibold mb-2">Online Members</h3>
      <ul className="list-disc pl-5 space-y-1">
        {members.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}
