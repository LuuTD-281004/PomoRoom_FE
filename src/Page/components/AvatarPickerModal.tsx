import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { getAllAvatars } from "@/axios/files";
import type { File } from "@/types/file";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (avatarUrl: string) => void;
  initial?: string | null;
};

const AvatarPickerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  initial,
}) => {
  const { t } = useTranslation();
  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<File[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    getAllAvatars()
      .then((res) => setAvatars(res?.result || []))
      .catch(() => setAvatars([]));
    setSelectedId(null);
  }, [isOpen]);

  // Lọc:
  // - Hiển thị tất cả avatar stars=0 (kể cả premium và không premium)
  // - Premium avatars sẽ được hiển thị để user biết cần mua premium
  const visibleAvatars = useMemo(() => {
    return avatars.filter((a) => {
      const zero = (a.stars ?? 0) === 0;
      return zero; // Hiển thị tất cả avatar stars=0
    });
  }, [avatars]);

  const selected = useMemo(
    () => visibleAvatars.find((a) => a.id === selectedId) || null,
    [selectedId, visibleAvatars]
  );

  const handleConfirm = () => {
    const url = selected?.filePath || initial || "";
    onConfirm(url);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("tabs.avatar")}
      variant="light"
    >
      <div className="max-w-full">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visibleAvatars.map((a) => {
              const hasPremium = !!(authenticatedUser?.isPersonalPremium || authenticatedUser?.isGroupPremium);
              const isPremiumItem = a.isPremium;
              const canSelect = !isPremiumItem || hasPremium;

              return (
                <button
                  key={a.id}
                  className={`group relative bg-[#A8A8A8] rounded-xl p-3 flex flex-col items-center gap-3 transition border-2 ${
                    selectedId === a.id
                      ? "border-[#0C1A57]"
                      : "border-transparent"
                  } ${!canSelect ? "opacity-75 cursor-pointer" : ""}`}
                  onClick={() => {
                    if (!canSelect) {
                      // Nếu là premium và user chưa có premium, navigate to /packages
                      onClose();
                      navigate("/packages");
                    } else {
                      setSelectedId(selectedId === a.id ? null : a.id);
                    }
                  }}
                  type="button"
                >
                  {/* Image area */}
                  <div className="relative w-full h-28 rounded-lg overflow-hidden bg-white">
                    <img
                      src={a.filePath}
                      alt={a.name || "avatar"}
                      className={`object-cover w-full h-full transition-all duration-300 ${
                        !canSelect ? "blur-[2px]" : ""
                      }`}
                    />
                    {!canSelect && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-xs">
                        {t("premium")}
                      </div>
                    )}
                  </div>

                  {/* Premium badge below the image */}
                  {a.isPremium && (
                    <span className="text-[11px] text-yellow-300 font-semibold">
                      {t("premium")}
                    </span>
                  )}
                </button>
              );
            })}

            {!visibleAvatars.length && (
              <div className="col-span-full text-center text-[#0C1A57]/70">
                {t("noItemsFound")}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              className="px-5 py-2 bg-[#0C1A57] text-white rounded-md hover:brightness-110"
              onClick={handleConfirm}
              type="button"
            >
              {t("playlistModal.confirm")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarPickerModal;
