import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { getAllAvatars, getAllBackgrounds } from "@/axios/files";
import type { File } from "@/types/file";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StarExchangeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authenticatedUser } = useAuth();
  const [tab, setTab] = useState<"theme" | "effect" | "avatar">("theme");
  const [backgrounds, setBackgrounds] = useState<File[]>([]);
  const [avatars, setAvatars] = useState<File[]>([]);
  const { t } = useTranslation();

  const fetchAvatars = async () => {
    try {
      const response = await getAllAvatars();
      if (response?.result) setAvatars(response.result);
    } catch (err) {
      console.error("Failed to fetch avatars:", err);
    }
  };

  const fetchBackgrounds = async () => {
    try {
      const response = await getAllBackgrounds();
      if (response?.result) setBackgrounds(response.result);
    } catch (err) {
      console.error("Failed to fetch backgrounds:", err);
    }
  };

  useEffect(() => {
    fetchAvatars();
    fetchBackgrounds();
  }, []);

  const renderItems = () => {
    const items = tab === "avatar" ? avatars : backgrounds;

    if (!items?.length)
      return (
        <div className="col-span-4 text-center text-slate-600 py-6">
          {t("noItemsFound")}
        </div>
      );

    return items.map((item) => (
      <div
        key={item.id}
        className="relative bg-[#A8A8A8] rounded-lg p-3 flex flex-col items-center gap-3"
      >
        {/* Preview Image */}
        <div className="relative w-full h-28 rounded-md overflow-hidden bg-white flex items-center justify-center">
          <img
            src={item.filePath}
            alt={item.name}
            className={`object-cover w-full h-full transition-all duration-300 ${
              item.isPremium ? "blur-sm scale-105" : ""
            }`}
          />
          {item.isPremium && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white font-semibold text-sm">
              {t("premium")}
            </div>
          )}
        </div>

        {/* Item name */}
        <div className="text-sm font-medium text-[#0234A7] text-center">
          {item.name}
        </div>

        {/* Price */}
        <div className="mt-auto relative w-full flex justify-center">
          <div
            className={`flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-[#0C1A57] font-semibold transition-all duration-300 ${
              item.isPremium ? "blur-sm" : ""
            }`}
          >
            ⭐ <span>{item.stars}</span>
          </div>

          {/* Optional overlay to emphasize it's locked */}
          {item.isPremium && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/20 rounded-full">
              🔒
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative z-[9999]">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant="light"
        title={t("starExchange")}
      >
        <div className="w-[920px] max-w-full">
          <div className="flex items-start -space-x-3">
            {/* Left tabs */}
            <div className="w-40 flex flex-col gap-1 mt-1">
              <button
                onClick={() => setTab("theme")}
                className={`text-left flex items-center gap-2 !text-xl !py-1.5 px-3 rounded-lg ${
                  tab === "theme" ? "!bg-[#B8D6FF]" : "hover:bg-[#B8D6FF]/60"
                }`}
              >
                🎨 {t("tabs.theme")}
              </button>

              <button
                onClick={() => setTab("avatar")}
                className={`text-left flex items-center gap-2 !text-xl !py-1.5 px-3 rounded-lg ${
                  tab === "avatar" ? "!bg-[#7274D3]" : "hover:bg-[#7274D3]/60"
                }`}
              >
                🧑‍🚀 {t("tabs.avatar")}
              </button>
            </div>

            {/* Main area */}
            <div className="flex-1 bg-[#B8D6FF] rounded-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0C1A57]">
                  {t(`tabs.${tab}`)}
                </h3>
                <div className="flex bg-white items-center gap-2 border-2 text-[#0C1A57] font-medium border-[#0C1A57] p-1 px-5 rounded-md">
                  ⭐ <span>{authenticatedUser?.userStar || 0}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">{renderItems()}</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
