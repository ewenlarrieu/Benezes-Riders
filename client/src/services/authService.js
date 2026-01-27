const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // Connexion admin
  async login(pseudo, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: pseudo, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    return response.json();
  },
};
