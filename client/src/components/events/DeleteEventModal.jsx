import React from 'react';

export default function DeleteEventModal({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  eventOptions,
  deleteId,
  onSelectChange,
}) {
  if (!open) return null;

  const hasEvents = eventOptions.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form onSubmit={onSubmit} className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp">
        <h2 className="text-xl font-bold mb-2">Supprimer un événement</h2>
        {!hasEvents ? (
          <p className="text-gray-300">Aucun événement à supprimer.</p>
        ) : (
          <>
            <label className="flex flex-col gap-2">
              <span>Événement</span>
              <select
                value={deleteId}
                onChange={(event) => onSelectChange(event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              >
                {eventOptions.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title} — {new Date(event.startDate).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm text-red-300">Cette action est irréversible.</p>
          </>
        )}
        <div className="flex gap-4 mt-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded button-hover" disabled={loading || !hasEvents}>
            {loading ? 'Suppression...' : 'Supprimer'}
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
