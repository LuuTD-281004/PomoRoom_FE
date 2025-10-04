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