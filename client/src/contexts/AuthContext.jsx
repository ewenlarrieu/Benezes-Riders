import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
   
      setIsAuthenticated(response.ok);
      

      if (!response.ok) {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
     
      setIsAuthenticated(false);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  
  const authFetch = async (url, options = {}) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(url, { 
        ...options,
        headers: {
          ...options.headers,
          ...(token && { 'Authorization': `Bearer ${token}` }),
        }
      });
      
   
      if (res.status === 401 || res.status === 403) {
        setIsAuthenticated(false);
        window.location.href = '/home';
        throw new Error("Session expirée, veuillez vous reconnecter.");
      }
      
      return res;
    } catch (error) {
      if (error.message === "Session expirée, veuillez vous reconnecter.") {
        throw error;
      }
      throw new Error("Erreur de connexion au serveur");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};
