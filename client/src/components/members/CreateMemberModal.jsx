import React from 'react';

export default function CreateMemberModal({ open, onClose, onSubmit, loading, error }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2 text-white">Ajouter un membre</h2>
        
        <label className="flex flex-col gap-2 text-white">
          <span>Nom / Surnom <span className="text-red-500">*</span></span>
          <input 
            name="name" 
            type="text" 
            required 
            className="p-2 rounded bg-[#1D1D1B] text-white border border-gray-600 focus:border-white focus:outline-none" 
            placeholder="Ex: Johnny ou &quot;Le Rapide&quot;"
          />
        </label>

        <label className="flex flex-col gap-2 text-white">
          <span>Photo <span className="text-red-500">*</span></span>
          <input 
            name="photo" 
            type="file" 
            accept="image/*"
            required 
            className="p-2 rounded bg-[#1D1D1B] text-white border border-gray-600 focus:border-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200" 
          />
          <p className="text-sm text-gray-400">Format accepté : JPG, PNG, WEBP (max 5MB)</p>
        </label>

        <div className="flex gap-4 mt-2">
          <button 
            type="submit" 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" 
            disabled={loading}
          >
            {loading ? 'Ajout en cours...' : 'Ajouter'}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
