import React, { useState } from "react";
import Modal from "@/Components/Modal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const SAMPLE_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: ["Đại dương sâu", "Noel", "Hoa đào", "Rừng thu", "Hoàng hôn", "Vũ trụ", "Băng giá", "Nắng sớm"][i % 8],
    price: [200, 400, 1000, 300, 250, 500, 1200, 120][i % 8],
}));

export const StarExchangeModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [tab, setTab] = useState<"theme" | "effect" | "avatar">("theme");

    const renderItems = () => {
        // for demo use same SAMPLE_ITEMS, could filter by tab
        return SAMPLE_ITEMS.map((it) => (
            <div key={it.id} className="bg-[#A8A8A8] rounded-lg p-3 flex flex-col items-center gap-3">
                <div className="w-full h-28 rounded-md bg-gradient-to-br from-sky-300 to-sky-100 overflow-hidden flex items-center justify-center text-sm text-slate-700">
                    <span className="select-none">ảnh</span>
                </div>
                <div className="text-sm font-medium text-[#0234A7] text-center">{it.title}</div>
                <div className="mt-auto">
                    <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-[#0C1A57]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
                            <path d="M12 .587l3.668 7.431L23.4 9.17l-5.7 5.557L19.335 24 12 20.201 4.665 24 6.3 14.727 0.6 9.17l7.732-1.152L12 .587z" fill="#FFE414" />
                        </svg>
                        <span className="font-semibold">{it.price}</span>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Trạm đổi sao">
            <div className="w-[920px] max-w-full">
                <div className="flex items-start -space-x-3">
                    {/* Left tabs */}
                    <div className="w-40 flex flex-col gap-1 mt-1">
                        <button
                            onClick={() => setTab("theme")}
                            className={`text-left flex items-center gap-2 !text-xl !py-1.5 !text-[#000000] px-3 rounded-lg !bg-[#B8D6FF]`}
                        >
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 0.53C3.71 1.68 2.5 3.71 2.5 6.03C2.5 8.35 3.71 10.38 5.53 11.53C2.46 11.53 0 9.07 0 6.03C0 4.57131 0.579463 3.17236 1.61091 2.14091C2.64236 1.10946 4.04131 0.53 5.5 0.53ZM17.07 2.03L18.5 3.46L2.93 19.03L1.5 17.6L17.07 2.03ZM10.89 4.46L9.41 3.53L7.97 4.53L8.39 2.83L7 1.77L8.75 1.65L9.33 0L10 1.63L11.73 1.66L10.38 2.79L10.89 4.46ZM7.59 8.07L6.43 7.34L5.31 8.12L5.65 6.8L4.56 5.97L5.92 5.88L6.37 4.59L6.88 5.86L8.24 5.89L7.19 6.76L7.59 8.07ZM17 12.03C17 13.4887 16.4205 14.8876 15.3891 15.9191C14.3576 16.9505 12.9587 17.53 11.5 17.53C10.28 17.53 9.15 17.13 8.24 16.46L15.93 8.77C16.6 9.68 17 10.81 17 12.03ZM12.6 18.61L15.37 17.46L15.13 20.81L12.6 18.61ZM16.93 15.91L18.08 13.14L20.28 15.68L16.93 15.91ZM18.08 10.95L16.94 8.17L20.28 8.41L18.08 10.95ZM7.63 17.46L10.4 18.61L7.87 20.8L7.63 17.46Z" fill="black" />
                            </svg>
                            Chủ đề
                        </button>
                        <button
                            onClick={() => setTab("effect")}
                            className={`text-left flex items-center gap-2 !text-xl !py-1.5 !text-[#000000] !px-0 !pl-5 rounded-lg !bg-[#6AD5E8]`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.4752 21.1802L15.208 15.1847L21.5522 13.325L16.669 8.88494L16.8528 2.30368L11.102 5.55494L4.87152 3.34721L6.2005 9.79674L2.16602 15.0135L8.73815 15.7483L12.4752 21.1802Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.0889 18.0269L22.0889 22.009" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Hiệu ứng
                        </button>
                        <button
                            onClick={() => setTab("avatar")}
                            className={`text-left flex items-center gap-2 !text-xl !py-1.5 !text-[#000000] px-3 rounded-lg !bg-[#7274D3]`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.50186 21.1155C2.50186 21.3278 2.67904 21.5 2.89761 21.5L21.1012 21.5C21.3197 21.5 21.4969 21.3279 21.4969 21.1157V20.6565C21.506 20.5182 21.5245 19.8277 21.0694 19.0644C20.7824 18.5831 20.3659 18.1673 19.8314 17.8286C19.1848 17.4189 18.3623 17.122 17.3674 16.9432C17.36 16.9423 16.6223 16.8445 15.8666 16.6515C14.5505 16.3153 14.4355 16.0178 14.4347 16.0149C14.427 15.9855 14.4158 15.9573 14.4014 15.9307C14.3907 15.8752 14.3641 15.6664 14.4149 15.1068C14.544 13.6855 15.3064 12.8455 15.919 12.1706C16.1122 11.9577 16.2947 11.7567 16.4352 11.5595C17.0414 10.709 17.0976 9.74195 17.1002 9.682C17.1002 9.56055 17.0862 9.4607 17.0564 9.36815C16.9969 9.18295 16.8849 9.06755 16.8032 8.9833L16.8026 8.9827C16.782 8.9615 16.7626 8.9414 16.7467 8.92295C16.7406 8.9159 16.7245 8.89725 16.7392 8.8015C16.793 8.44905 16.8253 8.15395 16.8408 7.8728C16.8684 7.3719 16.8899 6.6228 16.7607 5.89375C16.7448 5.76925 16.7174 5.63775 16.6747 5.4811C16.5382 4.97907 16.3189 4.54985 16.0142 4.19562C15.9618 4.13861 14.6878 2.7964 10.9894 2.521C10.478 2.48293 9.97245 2.50344 9.4748 2.52887C9.35485 2.5348 9.1906 2.54294 9.0369 2.58277C8.65505 2.68168 8.55315 2.92371 8.5264 3.05917C8.48205 3.28354 8.56 3.45807 8.61155 3.57359V3.5736V3.57361C8.61905 3.59036 8.6283 3.61106 8.61215 3.66498C8.5263 3.79794 8.39125 3.9178 8.25355 4.03136C8.21375 4.06519 7.28635 4.86484 7.23535 5.90945C7.09785 6.7039 7.10825 7.9417 7.27085 8.7972C7.2803 8.84445 7.29425 8.9144 7.2716 8.96165C7.09675 9.11835 6.89855 9.29595 6.89905 9.7012C6.90115 9.74195 6.9574 10.709 7.5636 11.5595C7.704 11.7565 7.8863 11.9574 8.07935 12.1701L8.0798 12.1706V12.1706C8.6924 12.8455 9.45475 13.6855 9.5839 15.1067C9.6347 15.6663 9.6081 15.8752 9.59735 15.9307C9.583 15.9572 9.5718 15.9855 9.5641 16.0149C9.5633 16.0178 9.4487 16.3143 8.1386 16.6498C7.3828 16.8433 6.63875 16.9422 6.61655 16.9454C5.6497 17.1086 4.83219 17.3981 4.18676 17.8057C3.65407 18.1422 3.23677 18.5587 2.94645 19.0438C2.48259 19.8189 2.49513 20.5248 2.50186 20.6537V21.1155Z" stroke="black" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                            Avatar
                        </button>
                    </div>

                    {/* Main area */}
                    <div className="flex-1 bg-[#B8D6FF] border-4 border-[#627795] rounded-md p-5" style={{ boxShadow: "inset 0 0 0 2px rgba(12,26,87,0.08)" }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-[#0C1A57]">
                                {tab === "theme" ? "Chủ đề" : tab === "effect" ? "Hiệu ứng" : "Avatar"}
                            </h3>
                            <div className="flex bg-white items-center h-fit gap-2 border-2 text-[#0C1A57] font-medium border-[#0C1A57] p-1 px-5 rounded-md">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3536 8.04257L14.358 7.1301L11.6778 1.44017C11.6046 1.28438 11.4841 1.15827 11.3354 1.08161C10.9623 0.888733 10.5089 1.04947 10.3223 1.44017L7.64213 7.1301L1.64652 8.04257C1.48122 8.0673 1.33009 8.1489 1.21438 8.27254C1.07449 8.4231 0.99741 8.62566 1.00007 8.8357C1.00272 9.04575 1.0849 9.24609 1.22855 9.39272L5.56645 13.8215L4.5416 20.0753C4.51757 20.2207 4.53294 20.3703 4.58598 20.5071C4.63901 20.6439 4.72759 20.7624 4.84166 20.8492C4.95573 20.9359 5.09074 20.9875 5.23137 20.998C5.37199 21.0085 5.51262 20.9775 5.63729 20.9086L11 17.9561L16.3628 20.9086C16.5092 20.9902 16.6792 21.0174 16.8422 20.9877C17.2531 20.9135 17.5293 20.5055 17.4585 20.0753L16.4336 13.8215L20.7715 9.39272C20.8896 9.27156 20.9675 9.1133 20.9912 8.9402C21.0549 8.50746 20.7668 8.10686 20.3536 8.04257Z" fill="#FFE414" stroke="#FFE414" />
                                </svg>
                                100
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {renderItems()}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StarExchangeModal;