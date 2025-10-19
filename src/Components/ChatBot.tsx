import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { askQuestion, getChatHistory } from "@/axios/chat";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { authenticatedUser } = useAuth();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const predefinedQuestions = [
    t("chatbot.q1"),
    t("chatbot.q2"),
    t("chatbot.q3"),
    t("chatbot.q4"),
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChat = async () => {
    if (authenticatedUser != null) {
      const response = await getChatHistory(authenticatedUser.id);
      if (response) {
        setMessage(response.data);
      }
    }
  };

  useEffect(() => {
    getChat();
  }, []);

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    let userId = uuidv4();
    if (authenticatedUser != null) {
      userId = authenticatedUser.id;
    }
    const response = await askQuestion(userId, userMessage);
    if (response) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white
                     bg-gradient-to-b from-[#6AD5E8] to-[#458895]"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-[440px] bg-white rounded-lg shadow-xl border border-[#0C1A57]/20 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-b from-[#6AD5E8] to-[#458895] text-white p-4">
            <h3 className="font-semibold text-center">{t("chatbot.hi")}</h3>
            <p className="text-sm text-center mt-1 opacity-90">
              {t("chatbot.how_can_i_help")}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && message.trim() === "" && (
              <div className="pb-3 mb-2 border-b border-[#0C1A57]/10 bg-[#F8FBFF] space-y-2">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left text-sm p-2 rounded-lg border border-[#6AD5E8]
                               hover:bg-[#EAF6FF] text-[#0C1A57]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow ${
                    msg.role === "user"
                      ? "bg-[#0C1A57] text-white"
                      : "bg-[#EAF6FF] text-[#0C1A57]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t border-[#0C1A57]/10">
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
