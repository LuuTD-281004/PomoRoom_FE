import React from "react";
import Modal from "@/Components/Modal";

type Props = {
    isOpen: boolean;
    onOK: () => void;
    onCancel: () => void;
};

const CancelModal: React.FC<Props> = ({ isOpen, onOK, onCancel }) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="">
            <div className="w-[420px] max-w-full">
                <div className="p-3 rounded-md text-white text-center">
                    <div className="mb-4 text-lg font-medium">
                        Bạn có muốn thoát khi chưa hết thời gian chứ ?
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                        <button
                            onClick={onOK}
                            className="px-6 py-2 bg-white text-[#0C1A57] rounded-md font-semibold shadow"
                        >
                            Thoát
                        </button>

                        <button
                            onClick={onCancel}
                            className="px-6 py-2 bg-white text-[#0C1A57] rounded-md font-semibold shadow"
                        >
                            Ở lại
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CancelModal;