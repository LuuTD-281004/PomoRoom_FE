import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const predefinedQuestions = [
  "Nếu ngưng trả phí thì dữ liệu có bị mất không?",
  "Có thể dùng chung gói trả phí với người khác không?",
  "Mua bản Pro có giúp mình học hiệu quả hơn không?",
  "Có nên nâng cấp không nếu mình chỉ học 1-2 tiếng mỗi ngày?",
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleQuestionClick = (question: string) => {
    setMessage(question);
    // Có thể thêm logic gửi câu hỏi ở đây
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Logic xử lý gửi tin nhắn
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <>
      {/* Float Button - brand gradient */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white
                     bg-gradient-to-b from-[#6AD5E8] to-[#458895]"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-xl border border-[#0C1A57]/20 overflow-hidden">
          {/* Header - brand gradient */}
          <div className="bg-gradient-to-b from-[#6AD5E8] to-[#458895] text-white p-4">
            <h3 className="font-semibold text-center">Xin chào!</h3>
            <p className="text-sm text-center mt-1 opacity-90">
              Tôi có thể giúp gì cho bạn?
            </p>
          </div>

          {/* Predefined Questions - brand borders/colors */}
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

          {/* Input Area */}
          <div className="p-4 border-t border-[#0C1A57]/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hỏi gì đó về môn học..."
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
