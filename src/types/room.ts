export type PersonalRoom = {
  id: string;
  roomStatus: number;
  focusTime: number;
  userId: string;
  loopCount: number;
  shortRestTime: number;
  longRestTime: number;
  endAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GroupRoom = {
  id: string;
  roomType: number;
  roomStatus: number;
  loopCount: number;
  roomName: string;
  focusTime: number;
  shortRestTime: number;
  longRestTime: number;
  roomCode: string;
  endAt: Date | null;
  participantCount: number;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
  participants: Participant[];
  messages: Message[];
};

export interface Participant {
  id: string;
  userId: string;
  createdAt: Date;
  user: UserParticipant | null;
}

export interface UserParticipant {
  id: string;
  username: string;
  email: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: Sender | null;
}

export interface Sender {
  id: string;
  name: string;
}
