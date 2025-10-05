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

export type Room = {
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
};
