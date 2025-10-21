import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { SearchIcon, UsersIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { createRoom, getAllRooms, joinRoom } from "@/axios/room";
import type { GroupRoom } from "@/types/room";
import { RoomType } from "@/enum/room-type";
import { useRoomSetup } from "@/contexts/RoomSetupContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PlaylistModal from "@/Page/room/components/PlaylistModal";
import defaultBackground from "@/assets/image/defaultBackground.png";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const JoinRoomModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  const { setup } = useRoomSetup();
  const [rooms, setRooms] = useState<GroupRoom[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<RoomType>(RoomType.PUBLIC);
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRooms();
    }
  }, [isOpen, page, search]);

  const openPlaylistBeforeCreate = () => {
    if (!roomName.trim()) {
      toast.warning("Vui lòng nhập tên phòng trước khi tạo.");
      return;
    }
    setIsPlaylistOpen(true);
  };

  const handleConfirmPlaylist = async () => {
    try {
      const response = await createRoom(
        roomName,
        selectedType,
        setup.shortBreakMinutes,
        setup.longBreakMinutes,
        setup.focusMinutes
      );

      if (response.status === 200 && response.data) {
        const roomId = response.data.result.id;
        setIsPlaylistOpen(false);
        navigate(`/group-room/${roomId}`);
      } else {
        console.error("Failed to create room:", response);
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await getAllRooms(page, 9, "createdAt", "DESC", search);
      setRooms(res.result.data);
      setTotalPages(res.result.pagination.totalPages);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (room: GroupRoom) => {
    try {
      const response = await joinRoom(room.id);

      if (response.status === 200 && response.data) {
        const roomId = response.data.result.id;
        navigate(`/group-room/${roomId}`);
      } else if (response.status === 400) {
        toast.warning("You cannot join this room.");
      } else {
        console.error("Failed to create room:", response);
      }
    } catch (err: any) {
      toast.warning("You cannot join this room.");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="light"
      title={t("joinRoomModal.title")}
    >
      <div className="w-[980px] max-w-full">
        <div className="flex gap-6">
          <div className="flex-1 bg-[#0ec0db] rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-3xl font-semibold text-white text-center">
                {t("joinRoomModal.public")}
              </h3>
            </div>

            <div className="flex items-center mb-4 bg-white/20 rounded-lg px-3 py-2">
              <SearchIcon className="text-white/80 mr-2" size={18} />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder={t("joinRoomModal.searchPlaceholder")}
                className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none"
              />
            </div>

            {loading ? (
              <div className="text-center text-white/90 py-8">
                {t("joinRoomModal.loading")}
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center text-white/90 py-8">
                {t("joinRoomModal.noRooms")}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleJoinRoom(r)}
                    className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition"
                  >
                    <div className="w-full h-16 rounded-md mb-2 overflow-hidden flex items-center justify-center bg-sky-100">
                      <img
                        src={defaultBackground}
                        alt="Room background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full flex justify-between items-center px-2">
                      <span className="text-sm font-medium text-slate-800 text-start flex-1 truncate">
                        {r.roomName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {r.participantCount ?? 0}
                      </span>
                      <UsersIcon className="text-slate-400 ml-1" size={16} />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`w-8 h-8 flex items-center justify-center text-[#0C1A57] rounded-md transition
                    ${
                      page === 1
                        ? "bg-white/10 cursor-not-allowed opacity-50"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition
                        ${
                          p === page
                            ? "bg-white text-[#0C1A57] font-medium"
                            : "bg-white/20 text-[#0C1A57] hover:bg-white/40"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`w-8 h-8 flex items-center justify-center text-[#0C1A57] rounded-md transition
                    ${
                      page === totalPages
                        ? "bg-white/10 cursor-not-allowed opacity-50"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="w-80 flex flex-col gap-6">
            <div className="bg-[#13a8c7] rounded-lg p-3">
              <h4 className="text-2xl font-semibold text-white text-center mb-3">
                {t("joinRoomModal.createRoom")}
              </h4>
              <div className="flex gap-3 justify-center">
                <Button
                  color="gray"
                  size="default"
                  onClick={() => setSelectedType(RoomType.PRIVATE)}
                  className={`transition-colors ${
                    selectedType === RoomType.PRIVATE
                      ? "bg-white text-[#0C1A57] font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {t("joinRoomModal.private")}
                </Button>

                <Button
                  color="gray"
                  size="default"
                  onClick={() => setSelectedType(RoomType.PUBLIC)}
                  className={`transition-colors ${
                    selectedType === RoomType.PUBLIC
                      ? "bg-white text-[#0C1A57] font-semibold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {t("joinRoomModal.public")}
                </Button>
              </div>
              <div className="flex gap-3 items-center pt-4">
                <input
                  type="text"
                  value={roomName}
                  maxLength={15}
                  onChange={(e) => setRoomName(e.currentTarget.value)}
                  placeholder={t("joinRoomModal.createRoomPlaceholder")}
                  className="flex-1 px-3 py-2 rounded text-[#0C1A57] bg-white/90"
                />
                <Button
                  color="gray"
                  size="small"
                  onClick={openPlaylistBeforeCreate}
                >
                  {t("joinRoomModal.createButton")}
                </Button>
              </div>
            </div>

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

            <div className="text-center text-white/90 text-sm">
              {t("joinRoomModal.helper")}
            </div>
          </div>
        </div>
      </div>
      <PlaylistModal
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        onTrackSelect={() => handleConfirmPlaylist()}
      />
    </Modal>
  );
};

export default JoinRoomModal;
