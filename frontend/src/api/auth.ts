import axios from "../api/axios";
import { User } from "../types/User";

interface AuthResponse {
  access: string;
  refresh: string;
}

const API_URL = "http://localhost:8000/auth";

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post<AuthResponse>(`${API_URL}/jwt/create/`, { username, password });
  if (response.data.access) {
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
  }
  return response;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return;

  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/jwt/refresh/`, { refresh });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const registerUser = (
  username: string,
  email: string,
  password: string
) => {
  return axios.post<AuthResponse>(`${API_URL}/users/`, {
    username,
    email,
    password,
  });
};

export const getCurrentUser = (token: string) => {
  return axios.get<User>(`${API_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const requestPasswordReset = (email: string) => {
  return axios.post(`${API_URL}/users/reset_password/`, { email });
};

export const resetPasswordConfirm = (
  uid: string,
  token: string,
  new_password: string
) => {
  return axios.post(`${API_URL}/users/reset_password_confirm/`, {
    uid,
    token,
    new_password,
  });
};

export const updateUserProfile = async (username: string, password: string) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(
      `${API_URL}/users/me/`,
      { username, password },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Profile update failed", error);
    return false;
  }
};