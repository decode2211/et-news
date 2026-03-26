import axios from "axios";
import type { ApiError } from "@/types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? "An unexpected error occurred",
    };
    return Promise.reject(apiError);
  }
);

export default apiClient;
