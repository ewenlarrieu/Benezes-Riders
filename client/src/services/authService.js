const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // Connexion admin
  async login(pseudo, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Envoyer et recevoir les cookies
      body: JSON.stringify({ username: pseudo, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    return response.json();
  },

  // Déconnexion admin
  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Envoyer le cookie pour le supprimer
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de déconnexion");
    }

    return response.json();
  },
};
