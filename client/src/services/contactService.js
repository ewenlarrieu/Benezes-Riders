const API_URL = import.meta.env.VITE_API_URL;

export const contactService = {
  // Envoyer un message de contact
  async sendMessage(messageData) {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    return response.json();
  },
};
