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
