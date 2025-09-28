import http from "./http";

export async function createRoom(
  name: string,
  roomType: number,
  shortRestTime: number,
  longRestTime: number
) {
    const response = await http.post("/rooms/create-room", {
    name: name,
    roomType: roomType,
    shortRestTime: shortRestTime,
    longRestTime: longRestTime,
  });

  return response.data.result;
}

export async function createPersonalRoom(
  page: number = 1,
  limit: number = 10,
  sortBy: string = "username",
  order: "ASC" | "DESC" = "ASC"
) {
  const response = await http.post("/rooms/create-personal-room", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data.result;
}
