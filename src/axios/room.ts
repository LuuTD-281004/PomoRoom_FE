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

  return response.data.result;
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

  return response.data.result;
}

export async function getCurrentWorkingPersonalRoom() {
  const response = await http.get("/rooms/current-working-personal-room");
  return response.data.result;
}
