import axios from "../api/axios";
import { User } from "../types/User";

interface AuthResponse {
  access: string;
  refresh: string;
}

const API_URL = "http://localhost:8000/auth";


export const loginUser = (username: string, password: string) => {
  return axios.post<AuthResponse>(`${API_URL}/jwt/create/`, { username, password });
};

export const registerUser = (username: string, email: string, password: string) => {
  return axios.post<AuthResponse>(`${API_URL}/users/`, { username, email, password });
};

export const getCurrentUser = (token: string) => {
  return axios.get<User>(`${API_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logoutUser = (refreshToken: string) => {
  return axios.post(`${API_URL}/jwt/logout/`, { refresh: refreshToken });
};