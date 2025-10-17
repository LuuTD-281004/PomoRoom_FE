import http from "./http";

export async function getUserInfo() {
  const response = await http.get("/users/user-detail");
  return response.data.result;
}

export async function getUsersRanking(page: number = 1, limit: number = 10) {
  const response = await http.get("/users/ranking", {
    params: { page, limit },
  });
  return response.data;
}

export async function updateUserProfile(payload: {
  username?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  avatarUrl?: string;
}) {
  const response = await http.put("/users/user-profile", payload);
  return response.data;
}
