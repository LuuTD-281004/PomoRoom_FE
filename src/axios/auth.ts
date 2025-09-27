import http from "./http";

export async function userRegister(
  username: string,
  email: string,
  password: string
) {
  const response = await http.post("/auth/register", {
    username: username,
    email: email,
    password: password,
  });

  return response;
}

export async function userLogin(
  email: string,
  password: string
) {
  const response = await http.post("/auth/login", {
    email: email,
    password: password,
  });

  return response;
}
