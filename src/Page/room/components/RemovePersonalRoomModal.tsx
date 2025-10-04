import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

interface RemovePersonalRoomModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const RemovePersonalRoomModal = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}: RemovePersonalRoomModalProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("room.exists_title", "Existing Room Found")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t(
              "room.exists_description",
              "You already have an existing room. Do you want to remove it and create a new one?"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={onClose}>
            {t("cancel", "Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {loading
              ? t("processing", "Processing...")
              : t("room.remove_and_continue", "Remove & Continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
