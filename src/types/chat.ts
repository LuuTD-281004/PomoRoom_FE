import type { UserType } from "./user";

export type Message = {
  id: string;
  content: string;
  sender: UserType;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Participant = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
};

export type Conversation = {
  id: string;
  participants: Participant[];
  messages?: Message[];
  createdAt: string;
  updatedAt: string;
};
