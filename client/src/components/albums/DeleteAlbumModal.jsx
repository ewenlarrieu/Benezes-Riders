import React from 'react';

export default function DeleteAlbumModal({ open, onClose, onConfirm, loading, selectedAlbum }) {
  if (!open || !selectedAlbum) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeInBg">
      <div className="bg-[#232323] p-8 rounded-2xl text-center w-full max-w-md animate-modalPop shadow-[0_0_25px_rgba(255,255,255,0.1)]">
        <h2 className="text-xl font-bold mb-4 text-red-500">Supprimer cet album ?</h2>
        <p className="text-gray-300 mb-6">Cette action est irréversible.</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 text-white px-5 py-2 rounded button-hover"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
          <button
            className="bg-gray-500 text-white px-5 py-2 rounded button-hover"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
