import type { GroupRoom } from "@/types/room";
import http from "./http";

export async function createRoom(
  name: string,
  roomType: number,
  shortRestTime: number,
  longRestTime: number,
  focusTime: number
) {
  const response = await http.post("/rooms/create-room", {
    name: name,
    roomType: roomType,
    shortRestTime: shortRestTime,
    longRestTime: longRestTime,
    focusTime: focusTime,
  });

  return response;
}

export async function getAllRooms(
  page: number = 1,
  limit: number = 10,
  sortBy: string = "username",
  order: "ASC" | "DESC" = "ASC",
  search?: string
) {
  const response = await http.get<{
    message: string;
    result: {
      data: GroupRoom[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }>("/rooms/all-rooms", {
    params: {
      page,
      limit,
      sortBy,
      order,
      ...(search ? { search } : {}),
    },
  });

  return response.data;
}

export async function getRoomByCode(code: string) {
  const response = await http.get(`/rooms/room-by-code/${code}`);
  return response;
}

export async function createPersonalRoom(
  shortRestTime: number,
  longRestTime: number,
  focusTime: number
) {
  const response = await http.post("/rooms/create-personal-room", {
    shortRestTime: shortRestTime,
    longRestTime: longRestTime,
    focusTime: focusTime,
  });

  return response;
}

export async function getGroupRoomById(roomId: string) {
  const response = await http.get(`/rooms/current-working-room/${roomId}`);
  return response;
}

export async function getCurrentWorkingPersonalRoom() {
  const response = await http.get("/rooms/current-working-personal-room");
  return response;
}

export async function updateRoomStatus() {
  const response = await http.put("/rooms/update-room-status");
  return response;
}

export async function stopPersonalRoom() {
  const response = await http.put("/rooms/stop-personal-room");
  return response;
}

export async function leaveRoom(userId: string) {
  const response = await http.post(`/rooms/leave/${userId}`);
  return response;
}

export async function joinRoom(roomId: string) {
  const response = await http.post(`/rooms/join/${roomId}`);
  return response;
}
