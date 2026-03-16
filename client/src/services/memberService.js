const API_URL = import.meta.env.VITE_API_URL;

export const memberService = {
  // Récupérer tous les membres
  async getAllMembers() {
    const res = await fetch(`${API_URL}/members`);
    if (!res.ok) throw new Error("Erreur lors de la récupération des membres");
    return res.json();
  },

  // Créer un membre (admin)
  async createMember(memberData, authFetch) {
    const res = await authFetch(`${API_URL}/members`, {
      method: "POST",
      body: memberData,
    });
    if (!res.ok) throw new Error("Erreur lors de la création du membre");
    return res.json();
  },

  // Modifier un membre (admin)
  async updateMember(memberId, memberData, authFetch) {
    const res = await authFetch(`${API_URL}/members/${memberId}`, {
      method: "PUT",
      body: memberData,
    });
    if (!res.ok) throw new Error("Erreur lors de la modification du membre");
    return res.json();
  },

  // Supprimer un membre (admin)
  async deleteMember(memberId, authFetch) {
    const res = await authFetch(`${API_URL}/members/${memberId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression du membre");
    return res.json();
  },
};
