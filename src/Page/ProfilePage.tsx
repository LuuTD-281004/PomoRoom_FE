import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/Components/Button";
import avatarDefault from "../assets/image/avatar.png";
import { PenLineIcon } from "lucide-react";
import Input from "@/Components/Input";
import { updateUserProfile } from "@/axios/user";
import { toast } from "sonner";
import AvatarPickerModal from "@/Page/components/AvatarPickerModal";
import { useLocation } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { authenticatedUser } = useAuth();
  const location = useLocation() as any;

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (authenticatedUser) {
      setUsername(authenticatedUser.username ?? "");
      setSelectedAvatarUrl(authenticatedUser.avatarUrl || "");
    }
  }, [authenticatedUser]);

  useEffect(() => {
    if (location?.state?.openAvatar) {
      setEditing(true);
      setShowAvatarModal(true);
      // optionally clear state here if needed
    }
  }, [location?.state]);

  const hours = 40; // Dữ liệu giả
  const stars = authenticatedUser?.userStar ?? 0;
  const rank = 2; // Dữ liệu giả

  const handleSave = async () => {
    if (!authenticatedUser || !authenticatedUser.email) {
      toast.error("Không tìm thấy thông tin người dùng hoặc email.");
      return;
    }

    const payload: {
      username: string;
      email: string;
      avatarUrl: string;
      oldPassword?: string;
      newPassword?: string;
    } = {
      username,
      email: authenticatedUser.email,
      avatarUrl: selectedAvatarUrl || authenticatedUser.avatarUrl || "",
    };

    if (newPassword) {
      if (!oldPassword) {
        toast.error("Vui lòng nhập mật khẩu cũ để đổi mật khẩu mới.");
        return;
      }
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }

    try {
      await updateUserProfile(payload);
      toast.success("Cập nhật thông tin thành công!");
      // If your AuthContext provides a refresh function, call it here (e.g., refreshUser())
      setEditing(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Cập nhật thất bại.");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setUsername(authenticatedUser?.username ?? "");
    setOldPassword("");
    setNewPassword("");
    setSelectedAvatarUrl(authenticatedUser?.avatarUrl || "");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-12 flex flex-col items-center justify-center">
        <div className="w-6xl mx-auto border-t-8 border-[#567CB1] bg-[#EAF6FF] rounded-2xl p-8 relative">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: avatar + stats */}
            <div className="col-span-5 flex flex-col items-center">
              <div className="relative">
                <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-md">
                  <img
                    src={
                      selectedAvatarUrl ||
                      authenticatedUser?.avatarUrl ||
                      avatarDefault
                    }
                    alt={authenticatedUser?.username || "avatar"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {editing && (
                  <button
                    aria-label="edit-avatar"
                    className="absolute right-5 bottom-5 transform translate-x-4 translate-y-4 bg-white rounded-full p-3 shadow-md"
                    onClick={() => setShowAvatarModal(true)}
                  >
                    <PenLineIcon className="stroke-1" />
                  </button>
                )}
              </div>

              <div className="w-full mt-2 px-6 pb-6">
                <div className="h-px bg-[#0C1A57] opacity-30 my-4" />
                <div className="flex justify-center gap-15 text-center">
                  <div>
                    <div className="text-5xl font-extrabold text-[#0C1A57]">
                      {hours}
                    </div>
                    <div className="text-xs text-[#0C1A57] mt-2 flex flex-col gap-2 items-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 55 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.4999 4.58325C14.8958 4.58325 4.58325 14.8958 4.58325 27.4999C4.58325 40.1041 14.8958 50.4166 27.4999 50.4166C40.1041 50.4166 50.4166 40.1041 50.4166 27.4999C50.4166 14.8958 40.1041 4.58325 27.4999 4.58325ZM35.5208 32.0833C34.8333 33.2291 33.4583 33.4582 32.3124 32.9999L26.3541 29.5624C25.6666 29.1041 25.2083 28.4166 25.2083 27.4999V16.0416C25.2083 14.6666 26.1249 13.7499 27.4999 13.7499C28.8749 13.7499 29.7916 14.6666 29.7916 16.0416V26.1249L34.6041 28.8749C35.7499 29.5624 35.9791 30.9374 35.5208 32.0833Z"
                          fill="#0C1A57"
                        />
                      </svg>
                      <span>GIỜ</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-5xl font-extrabold text-[#0C1A57]">
                      {stars}
                    </div>
                    <div className="text-xs text-[#0C1A57] mt-2 flex flex-col gap-2 items-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 55 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M50.4166 23.1458C50.6458 21.9999 49.7291 20.6249 48.5833 20.6249L35.5208 18.7916L29.5624 6.87494C29.3333 6.41661 29.1041 6.18744 28.6458 5.95827C27.4999 5.27077 26.1249 5.72911 25.4374 6.87494L19.7083 18.7916L6.64575 20.6249C5.95825 20.6249 5.49992 20.8541 5.27075 21.3124C4.35409 22.2291 4.35409 23.6041 5.27075 24.5208L14.6666 33.6874L12.3749 46.7499C12.3749 47.2083 12.3749 47.6666 12.6041 48.1249C13.2916 49.2708 14.6666 49.7291 15.8124 49.0416L27.4999 42.8541L39.1874 49.0416C39.4166 49.2708 39.8749 49.2708 40.3333 49.2708C40.5624 49.2708 40.5624 49.2708 40.7916 49.2708C41.9374 49.0416 42.8541 47.8958 42.6249 46.5208L40.3333 33.4583L49.7291 24.2916C50.1874 24.0624 50.4166 23.6041 50.4166 23.1458Z"
                          fill="#FFEB57"
                        />
                      </svg>
                      <span>SAO</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-5xl font-extrabold text-[#0C1A57]">
                      {rank}
                    </div>
                    <div className="text-xs text-[#0C1A57] mt-2 flex flex-col gap-2 items-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 61 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M43.2083 4.83325H33.0416V14.6425C36.6795 15.0227 40.1672 16.2323 43.2083 18.1684V4.83325ZM27.9583 4.83325H17.7916V18.1684C20.8326 16.2323 24.3203 15.0227 27.9583 14.6425V4.83325ZM30.4999 53.1666C35.2186 53.1666 39.7439 51.3843 43.0805 48.2118C46.4171 45.0393 48.2916 40.7365 48.2916 36.2499C48.2916 31.7633 46.4171 27.4605 43.0805 24.288C39.7439 21.1155 35.2186 19.3333 30.4999 19.3333C25.7813 19.3333 21.2559 21.1155 17.9193 24.288C14.5827 27.4605 12.7083 31.7633 12.7083 36.2499C12.7083 40.7365 14.5827 45.0393 17.9193 48.2118C21.2559 51.3843 25.7813 53.1666 30.4999 53.1666ZM27.3864 32.579L30.4999 26.5833L33.6135 32.579L40.5725 33.5384L35.5375 38.2074L36.727 44.7977L30.4999 41.6874L24.2754 44.7977L25.4649 38.2074L20.4298 33.5384L27.3864 32.579Z"
                          fill="#EB892D"
                        />
                      </svg>
                      <span>HẠNG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="col-span-7">
              <h2 className="text-xl font-semibold text-[#0C1A57] mb-5">
                Hồ sơ của tôi
              </h2>
              <div className="space-y-4">
                <Input
                  label={t("username")}
                  placeholder={t("username")}
                  value={username}
                  disabled={!editing}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label={t("email")}
                  placeholder={t("email")}
                  value={authenticatedUser?.email ?? ""}
                  disabled={true}
                  onChange={function (
                    _e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
                {editing && (
                  <>
                    <Input
                      label="Mật khẩu cũ"
                      type="password"
                      placeholder="Nhập mật khẩu cũ nếu muốn thay đổi"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Input
                      label="Mật khẩu mới"
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </>
                )}
              </div>
              <div className="text-right mt-6">
                {!editing ? (
                  <Button
                    onClick={() => setEditing(true)}
                    size="small"
                    className="bg-white text-[#0C1A57]"
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={handleSave}
                      size="small"
                      className="bg-[#6AD5E8] text-[#0C1A57]"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      size="small"
                      className="bg-white text-[#0C1A57]"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AvatarPickerModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        initial={selectedAvatarUrl || authenticatedUser?.avatarUrl || ""}
        onConfirm={(url) => setSelectedAvatarUrl(url)}
      />
    </div>
  );
};

export default ProfilePage;
