import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Vérifie si un token est déjà stocké
  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      setIsAuthenticated(true);
      setToken(stored);
    }
  }, []);

  const login = (value) => {
    localStorage.setItem("adminToken", value);
    setIsAuthenticated(true);
    setToken(value);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setToken(null);
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401 || res.status === 403) {
      logout();
      throw new Error("Session expirée, veuillez vous reconnecter.");
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
