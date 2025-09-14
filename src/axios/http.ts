import axios, { type AxiosInstance } from "axios";
import { hideLoading, showLoading } from "../lib/loading-helper";
import { showNotification } from "../Components/NotificationHelper";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    showLoading();
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();
    // Handle errors globally
    console.error("Axios error:", error.response || error.message);

    // Optional: you can throw a custom error or handle specific status codes
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // window.location.href = "/"
      } else if (status === 500) {
        showNotification.error(
          "Unexpected error has been occurred",
          "Please try again"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default http;
