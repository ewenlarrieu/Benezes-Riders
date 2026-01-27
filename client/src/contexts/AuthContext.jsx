import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Fonction pour vérifier si le token est expiré
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
      // Décoder le JWT (format: header.payload.signature)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // exp est en secondes, on convertit en ms
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return true; // Si erreur, considérer le token comme expiré
    }
  };

  // Vérifie si un token est déjà stocké ET valide
  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      // Vérifier si le token est expiré
      if (isTokenExpired(stored)) {
        // Token expiré, nettoyer et rediriger
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        setToken(null);
      } else {
        // Token valide
        setIsAuthenticated(true);
        setToken(stored);
      }
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
