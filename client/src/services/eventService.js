const API_URL = import.meta.env.VITE_API_URL;

export const eventService = {
  // Récupérer le prochain événement
  async getNextEvent() {
    const res = await fetch(`${API_URL}/events/next`);
    if (!res.ok)
      throw new Error("Erreur lors de la récupération du prochain événement");
    return res.json();
  },

  // Récupérer tous les événements
  async getAllEvents() {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok)
      throw new Error("Erreur lors de la récupération des événements");
    return res.json();
  },

  // Créer un événement (admin)
  async createEvent(eventData, authFetch) {
    const res = await authFetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de l'événement");
    return res.json();
  },

  // Modifier un événement (admin)
  async updateEvent(eventId, eventData, authFetch) {
    const res = await authFetch(`${API_URL}/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok)
      throw new Error("Erreur lors de la modification de l'événement");
    return res.json();
  },

  // Supprimer un événement (admin)
  async deleteEvent(eventId, authFetch) {
    const res = await authFetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok)
      throw new Error("Erreur lors de la suppression de l'événement");
    return res.json();
  },

  // Inscription gratuite à un événement
  async registerToEvent(eventId, registrationData) {
    const res = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur lors de l'inscription");
    }
    return res.json();
  },

  // Créer une session de paiement Stripe
  async createCheckoutSession(eventData) {
    const res = await fetch(`${API_URL}/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.message || "Erreur lors de la création de la session Stripe",
      );
    }
    return res.json();
  },

  // Vérifier le paiement Stripe
  async verifyPayment(sessionId) {
    const res = await fetch(`${API_URL}/stripe/verify-payment/${sessionId}`);
    if (!res.ok) throw new Error("Erreur lors de la vérification du paiement");
    return res.json();
  },
};
