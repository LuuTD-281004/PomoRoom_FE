import http from "./http";

export async function getAllAvatars() {
  const response = await http.get("/files/all-avatars");
  return response.data;
}

export async function getAllBackgrounds() {
  const response = await http.get("/files/all-backgrounds");
  return response.data;
}

export async function purchaseAvatar(id: string) {
  const response = await http.post(`/files/purchase-avatar/${id}`);
  return response.data;
}

export async function purchaseBackground(id: string) {
  const response = await http.post(`/files/purchase-background/${id}`);
  return response.data;
}