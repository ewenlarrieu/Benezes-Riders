import React from 'react';

export default function CreateAlbumModal({ open, onClose, onSubmit, loading, error, titleRef, coverRef }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2">Créer un album</h2>
        <p>Titre de l'album :</p>
        <input
          ref={titleRef}
          type="text"
          placeholder="Titre de l'album"
          className="p-2 rounded bg-[#1D1D1B] text-white border"
          required
        />
        <p>Image de couverture :</p>
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          className="p-2 rounded bg-[#1D1D1B] text-white border"
          required
        />
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded button-hover"
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer'}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
