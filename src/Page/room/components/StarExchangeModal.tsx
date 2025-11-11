import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { getAllAvatars, getAllBackgrounds, purchaseAvatar, purchaseBackground } from "@/axios/files";
import { getUserInfo } from "@/axios/user";
import type { File } from "@/types/file";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StarExchangeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { authenticatedUser } = useAuth();
  const [tab, setTab] = useState<"theme" | "effect" | "avatar">("theme");
  const [backgrounds, setBackgrounds] = useState<File[]>([]);
  const [avatars, setAvatars] = useState<File[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    const isPersonalPremium = !!authenticatedUser?.isPersonalPremium;
    const isGroupPremium = !!authenticatedUser?.isGroupPremium;
    const hasAnyPremium = isPersonalPremium || isGroupPremium;

    // Logic filter:
    // - Items có thể mua bằng sao (stars > 0) luôn hiển thị
    // - Items premium miễn phí (isPremium && stars === 0): 
    //   + Nếu user có premium (personal hoặc group): KHÔNG hiển thị (vì đã có sẵn)
    //   + Nếu user không có premium: hiển thị để biết cần mua premium
    // - Items free (không premium, stars === 0) không hiển thị trong StarExchange
    const filterFn = (item: File) => {
      const stars = item.stars ?? 0;
      
      // Items có thể mua bằng sao luôn hiển thị
      if (stars > 0) return true;
      
      // Items premium miễn phí: chỉ hiển thị nếu user chưa có premium
      if (item.isPremium && stars === 0) {
        return !hasAnyPremium;
      }
      
      // Items free (không premium, stars === 0) không hiển thị trong StarExchange
      return false;
    };

    const source = tab === "avatar" ? avatars : backgrounds;
    const items = source.filter(filterFn);

    if (!items?.length)
      return (
        <div className="col-span-4 text-center text-slate-600 py-6">
          {t("noItemsFound")}
        </div>
      );

    const handleBuy = async (file: File) => {
      if (loading) return; // Prevent double purchases
      
      // Nếu là premium item (isPremium && stars === 0) và user chưa có premium, navigate to /packages
      if (file.isPremium && (file.stars ?? 0) === 0 && !hasAnyPremium) {
        onClose();
        navigate("/packages");
        return;
      }
      
      try {
        setLoading(file.id);
        const userStars = authenticatedUser?.userStar ?? 0;
        const cost = file.stars ?? 0;
        if (userStars < cost) {
          toast.warning(t("notEnoughStars"));
          return;
        }
        
        let res;
        if (tab === "avatar") {
          res = await purchaseAvatar(file.id);
        } else {
          res = await purchaseBackground(file.id);
        }
        
        if (res?.result) {
          // Refresh user data to update star count
          try {
            await getUserInfo();
            // Force a page reload to update the user context
            window.location.reload();
          } catch (err) {
            console.error("Failed to refresh user data:", err);
          }
          
          // Refetch items to update the list
          if (tab === "avatar") {
            await fetchAvatars();
          } else {
            await fetchBackgrounds();
          }
          
          toast.success(t("purchasedSuccessfully"));
          onClose();
          
          if (tab === "avatar") {
            navigate("/profile", { state: { openAvatar: true } });
          } else {
            navigate("/rooms", { state: { openJoinRooms: true } });
          }
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("purchaseFailed"));
      } finally {
        setLoading(null);
      }
    };

    return items.map((item) => (
      <button
        key={item.id}
        type="button"
        onClick={() => handleBuy(item)}
        disabled={!!loading}
        aria-busy={loading === item.id}
className={`relative bg-[#A8A8A8] rounded-lg p-1 flex flex-col items-center gap-1 overflow-hidden transition-transform hover:scale-105 focus:outline-none ${
  tab === "theme" ? "w-[210px]" : "w-[160px]"
}`}
      >
        {/* Preview Image (lớn hơn) */}
        <div className="relative w-full h-36 rounded-md overflow-hidden bg-white flex items-center justify-center">
          <img
            src={item.filePath}
            alt={item.name}
            className={`object-cover w-full h-full transition-all duration-300 ${
              item.isPremium ? "blur-[2px] scale-105" : ""
            }`}
          />
          {item.isPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-sm">
              {t("premium")}
            </div>
          )}
        </div>

        {/* Star badge: nhỏ, hiện bên dưới ảnh */}
        <div className="w-full flex items-center justify-center mt-1">
          <div className="inline-flex items-center gap-1 bg-[#0C1A57] text-white rounded-full px-2 py-0.5 text-xs font-semibold">
            <span>⭐</span>
            <span>{item.stars ?? 0}</span>
          </div>
        </div>

        {/* Name: nhỏ gọn */}
        <div className="text-xs font-medium text-[#0234A7] text-center py-1 w-full truncate">
          {item.name}
        </div>

        {/* loading overlay */}
        {loading === item.id && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 text-white">
            ...
          </div>
        )}
      </button>
    ));
  };

  return (
    <div className="relative z-[9999] isolate">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant="light"
        title={t("starExchange")}
      >
        <div className="w-[920px] max-w-full">
          <div className="flex items-start gap-5">
            {/* Left tabs (sticky) */}
            <div className="w-44 flex flex-col gap-2 mt-1 sticky top-0 self-start z-10">
              {[
                {
                  key: "theme",
                  label: "🎨 " + t("tabs.theme"),
                  color: "#CFE4FF",
                },
                {
                  key: "avatar",
                  label: "🧑‍🚀 " + t("tabs.avatar"),
                  color: "#A8B4FF",
                },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => setTab(key as "theme" | "avatar")}
                  className={`text-left flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-sm border ${
                    tab === key
                      ? "bg-white text-[#0C1A57] border-[#0C1A57]/30 shadow-md"
                      : `bg-[${color}] text-[#0C1A57] hover:brightness-105 border-transparent`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Main area with scroll */}
            <div className="flex-1 bg-[#B8D6FF] rounded-md p-5 h-fit overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0C1A57]">
                  {t(`tabs.${tab}`)}
                </h3>
                <div className="flex bg-white items-center gap-2 border-2 text-[#0C1A57] font-medium border-[#0C1A57] p-1 px-5 rounded-md">
                  ⭐ <span>{authenticatedUser?.userStar || 0}</span>
                </div>
              </div>
<div
  className={`overflow-y-auto h-full [scrollbar-gutter:stable] ${
    tab === "theme"
      ? "grid grid-cols-3 gap-4" // 🌟 background: 3 card 1 hàng
      : "grid grid-cols-4 gap-4" // avatar: giữ 4 card như cũ
  }`}
>
  {renderItems()}
</div>
           </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
