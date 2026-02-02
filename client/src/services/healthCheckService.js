const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fonction pour pinger le serveur
const pingServer = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Serveur actif:", data.status);
      return true;
    }
    return false;
  } catch (error) {
    console.error("❌ Erreur lors du ping du serveur:", error.message);
    return false;
  }
};

// Démarre le système de ping automatique
export const startHealthCheck = () => {
  // Ping immédiat au démarrage
  pingServer();

  // Ping toutes les 5 minutes (300000 ms)
  const intervalId = setInterval(
    () => {
      pingServer();
    },
    5 * 60 * 1000,
  );

  // Retourne l'ID de l'intervalle pour pouvoir l'arrêter si nécessaire
  return intervalId;
};

// Fonction pour arrêter le ping automatique
export const stopHealthCheck = (intervalId) => {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("🛑 Health check arrêté");
  }
};

export default { startHealthCheck, stopHealthCheck };
