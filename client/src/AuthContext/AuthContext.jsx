import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    
    try {
      const res = await fetch(url, { ...options, headers });
      
      // Si token invalide ou expiré, déconnecter automatiquement
      if (res.status === 401 || res.status === 403) {
        logout();
        window.location.href = '/home'; // Redirection automatique
        throw new Error("Session expirée, veuillez vous reconnecter.");
      }
      
      return res;
    } catch (error) {
      // Si erreur réseau, propager l'erreur
      if (error.message === "Session expirée, veuillez vous reconnecter.") {
        throw error;
      }
      throw new Error("Erreur de connexion au serveur");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
