import axios from "../api/axios";

interface AuthResponse {
  access: string;
  refresh: string;
}

export const registerUser = async (username: string, password: string) => {
  return axios.post("/auth/users/", { username, password });
};

export const loginUser = async (username: string, password: string) => {
  return axios.post<AuthResponse>("/auth/jwt/create/", { username, password });
};

export const getCurrentUser = async (token: string) => {
  return axios.get("/auth/users/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logoutUser = async (refreshToken: string) => {
  return axios.post("/auth/jwt/blacklist/", { refresh: refreshToken });
};