import http from "./http";

export async function getUserInfo() {
  const response = await http.get("/users/user-detail");
  return response.data.result;
}
