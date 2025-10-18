import http from "./http";

export async function getAllPaymentPackages() {
  const response = await http.get("/payment/all-packages");
  return response.data; // { message, result: Package[] }
}