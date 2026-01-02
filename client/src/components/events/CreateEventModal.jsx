import React from 'react';

export default function CreateEventModal({ open, onClose, onSubmit, loading, error }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2">Créer un événement</h2>
        <label className="flex flex-col gap-2">
          <span>Titre</span>
          <input name="title" type="text" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <label className="flex flex-col gap-2">
          <span>Date de début</span>
          <input name="startDate" type="date" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <label className="flex flex-col gap-2">
          <span>Date de fin</span>
          <input name="endDate" type="date" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <label className="flex flex-col gap-2">
          <span>Lieu</span>
          <input name="location" type="text" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <label className="flex flex-col gap-2">
          <span>Description</span>
          <textarea name="description" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <label className="flex flex-col gap-2">
          <span>Prix (€)</span>
          <input name="price" type="number" min="0" step="0.01" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
        </label>
        <div className="flex gap-4 mt-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded button-hover" disabled={loading}>
            {loading ? 'Création...' : 'Créer'}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
            onClick={() => {
              onClose();
            }}
          >
            Annuler
          </button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
