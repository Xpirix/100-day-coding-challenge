import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, logoutUser, refreshToken } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchUser();
    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setLoading(false);
    navigate("/", { replace: true });
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


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};