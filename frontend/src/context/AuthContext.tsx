import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, logoutUser, refreshToken } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        try {
          const response = await getCurrentUser(newAccessToken);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
    };
    fetchUser();
    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });
  };
  
  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      await logoutUser();
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};