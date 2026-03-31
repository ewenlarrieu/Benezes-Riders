import React from 'react';

export default function DeleteMemberModal({ open, onClose, onSubmit, loading, error, members, selectedId, onSelectChange }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2 text-white">Supprimer un membre</h2>
        
        {members.length === 0 ? (
          <p className="text-gray-400">Aucun membre à supprimer</p>
        ) : (
          <>
            <label className="flex flex-col gap-2 text-white">
              <span>Sélectionner le membre à supprimer <span className="text-red-500">*</span></span>
              <select
                value={selectedId}
                onChange={(e) => onSelectChange(e.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border border-gray-600 focus:border-white focus:outline-none"
              >
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="bg-yellow-900/30 border border-yellow-600 rounded p-3 text-yellow-200 text-sm">
              <strong> Attention :</strong> Cette action est irréversible. La photo sera également supprimée.
            </div>

            <div className="flex gap-4 mt-2">
              <button 
                type="submit" 
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition" 
                disabled={loading}
              >
                {loading ? 'Suppression...' : 'Supprimer'}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={onClose}
              >
                Annuler
              </button>
            </div>
          </>
        )}

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
