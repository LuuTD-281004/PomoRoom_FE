import http from "./http";

export async function getAllAvatars() {
  const response = await http.get("/files/all-avatars");
  return response.data;
}

export async function getAllBackgrounds() {
  const response = await http.get("/files/all-backgrounds");
  return response.data;
}
