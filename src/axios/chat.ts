import type { AxiosInstance } from "axios";
import axios from "axios";

const agentClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getChatHistory(userId: string) {
  const response = await agentClient.post("/user-chat-history", {
    user_id: userId,
    thread_id: userId,
    agent_name: import.meta.env.VITE_AGENT_NAME,
  });
  return response.data;
}

export async function askQuestion(userId: string, question: string) {
  const response = await agentClient.post("/ask", {
    user_thread: {
      user_id: userId,
      thread_id: userId,
      agent_name: import.meta.env.VITE_AGENT_NAME,
    },
    question: question,
  });
  return response.data;
}
