import React from "react";
import Modal from "@/Components/Modal";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onOK: () => void;
  onCancel: () => void;
};

const CancelModal: React.FC<Props> = ({ isOpen, onOK, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="" size="sm">
      <div className="w-[420px] max-w-full">
        <div className="p-3 rounded-md text-white text-center">
          <div className="mb-4 text-lg font-medium">
            {t("cancelModal.message")}
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={onOK}
              className="px-6 py-2 bg-white text-[#0C1A57] rounded-md font-semibold shadow"
            >
              {t("cancelModal.exit")}
            </button>

            <button
              onClick={onCancel}
              className="px-6 py-2 bg-white text-[#0C1A57] rounded-md font-semibold shadow"
            >
              {t("cancelModal.stay")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
