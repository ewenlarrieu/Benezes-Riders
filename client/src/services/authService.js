const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // Connexion admin
  async login(pseudo, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: pseudo, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur de connexion");
    }

    // Stocker le token dans localStorage
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
    }

    return data;
  },

  // Déconnexion admin
  async logout() {
    // Supprimer le token du localStorage
    localStorage.removeItem("adminToken");

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de déconnexion");
    }

    return response.json();
  },
};
