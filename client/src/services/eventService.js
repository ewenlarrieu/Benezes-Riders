const API_URL = import.meta.env.VITE_API_URL;

export const eventService = {
  async getNextEvent() {
    const res = await fetch(`${API_URL}/events/next`);
    if (!res.ok)
      throw new Error("Erreur lors de la récupération du prochain événement");
    return res.json();
  },

  async getAllEvents() {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok)
      throw new Error("Erreur lors de la récupération des événements");
    return res.json();
  },

  async createEvent(eventData, authFetch) {
    const res = await authFetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de l'événement");
    return res.json();
  },

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

  async deleteEvent(eventId, authFetch) {
    const res = await authFetch(`${API_URL}/events/${eventId}`, {
      method: "DELETE",
    });
    if (!res.ok)
      throw new Error("Erreur lors de la suppression de l'événement");
    return res.json();
  },
};
