import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ChatBot: React.FC = () => {
  const { t } = useTranslation(); // ✅ Phải gọi trong component
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Lấy câu hỏi từ file ngôn ngữ
  const predefinedQuestions = [
    t("chatbot.q1"),
    t("chatbot.q2"),
    t("chatbot.q3"),
    t("chatbot.q4"),
  ];

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <>
      {/* Nút mở chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white
                     bg-gradient-to-b from-[#6AD5E8] to-[#458895]"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Khung Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-xl border border-[#0C1A57]/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-b from-[#6AD5E8] to-[#458895] text-white p-4">
            <h3 className="font-semibold text-center">{t("chatbot.hi")}</h3>
            <p className="text-sm text-center mt-1 opacity-90">
              {t("chatbot.how_can_i_help")}
            </p>
          </div>

          {/* Danh sách câu hỏi */}
          <div className="p-4 space-y-3">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full p-3 text-left text-sm rounded-lg transition-colors
                           text-[#0C1A57] border border-[#6AD5E8] hover:bg-[#EAF6FF]"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input gửi tin nhắn */}
          <div className="p-4 border-t border-[#0C1A57]/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("chatbot.how_can_i_help")}
                className="flex-1 px-3 py-2 border border-[#6AD5E8] rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#6AD5E8]"
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-3 py-2 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                           bg-[#0C1A57] hover:brightness-110"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
