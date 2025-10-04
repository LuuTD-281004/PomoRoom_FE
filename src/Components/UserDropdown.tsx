import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { ClockIcon, LogOut, SettingsIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "@/types/user";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

interface UserDropdownProps {
  user: UserType;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.username || "User"} />
          ) : (
            <AvatarFallback>
              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">{user.username || "Người dùng"}</span>
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
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>{t("roomLayout.settings")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
