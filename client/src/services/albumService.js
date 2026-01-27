const API_URL = import.meta.env.VITE_API_URL;

export const albumService = {
  // Récupérer tous les albums
  async getAllAlbums() {
    const res = await fetch(`${API_URL}/albums`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des albums");
    return res.json();
  },

  // Récupérer un album par ID
  async getAlbumById(albumId) {
    const res = await fetch(`${API_URL}/albums/${albumId}`);
    if (!res.ok) throw new Error("Erreur lors de la récupération de l'album");
    return res.json();
  },

  // Créer un album (admin)
  async createAlbum(albumData, authFetch) {
    const res = await authFetch(`${API_URL}/albums`, {
      method: "POST",
      body: albumData,
    });
    if (!res.ok) throw new Error("Erreur lors de la création de l'album");
    return res.json();
  },

  // Modifier un album (admin)
  async updateAlbum(albumId, albumData, authFetch) {
    const res = await authFetch(`${API_URL}/albums/${albumId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(albumData),
    });
    if (!res.ok) throw new Error("Erreur lors de la modification de l'album");
    return res.json();
  },

  // Modifier la photo de couverture (admin)
  async updateAlbumCover(albumId, formData, authFetch) {
    const res = await authFetch(`${API_URL}/albums/${albumId}/cover`, {
      method: "PUT",
      body: formData,
    });
    if (!res.ok)
      throw new Error("Erreur lors de la modification de la couverture");
    return res.json();
  },

  // Supprimer un album (admin)
  async deleteAlbum(albumId, authFetch) {
    const res = await authFetch(`${API_URL}/albums/${albumId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression de l'album");
    return res.json();
  },

  // Ajouter des photos à un album (admin)
  async addPhotos(albumId, formData, authFetch) {
    const res = await authFetch(`${API_URL}/albums/${albumId}/photos`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Erreur lors de l'ajout des photos");
    return res.json();
  },

  // Supprimer une photo d'un album (admin)
  async deletePhoto(albumId, photoUrl, authFetch) {
    const res = await authFetch(`${API_URL}/albums/${albumId}/photos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoUrl }),
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression de la photo");
    return res.json();
  },
};
