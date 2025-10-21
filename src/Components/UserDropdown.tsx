import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { ClockIcon, LogOut, StarIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { StarExchangeModal } from "@/Page/room/components/StarExchangeModal";

interface UserDropdownProps {
  user: UserType;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [showStarExchange, setShowStarExchange] = useState(false);
  const isPremium = Boolean(user?.isPersonalPremium || user?.isGroupPremium);

  const handleOpenStarExchangeDialog = () => {
    setShowStarExchange(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {
            isPremium ? (
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-blue-400 via-sky-500 to-indigo-500">
                <Avatar className="cursor-pointer bg-white">
                  {user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt={user.username || "User"} />
                  ) : (
                    <AvatarFallback>
                      {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            ) : (
              <Avatar className="cursor-pointer">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.username || "User"} />
                ) : (
                  <AvatarFallback>
                    {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            )
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">
                {user.username || "Người dùng"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email || ""}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>{t("roomLayout.account")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>{t("roomLayout.history")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenStarExchangeDialog}>
            <StarIcon className="mr-2 h-4 w-4" />
            <span>{t("roomLayout.starExchange")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StarExchangeModal
        isOpen={showStarExchange}
        onClose={() => setShowStarExchange(false)}
      />
    </>
  );
}
