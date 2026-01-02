import React from 'react';

export default function EditEventModal({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  eventOptions,
  editId,
  onSelectChange,
  editForm,
  onFieldChange,
}) {
  if (!open) return null;

  const hasEvents = eventOptions.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form onSubmit={onSubmit} className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp">
        <h2 className="text-xl font-bold mb-2">Modifier un événement</h2>
        {!hasEvents ? (
          <p className="text-gray-300">Aucun événement à modifier.</p>
        ) : (
          <>
            <label className="flex flex-col gap-2">
              <span>Événement</span>
              <select
                value={editId}
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
            <label className="flex flex-col gap-2">
              <span>Titre</span>
              <input
                type="text"
                value={editForm.title}
                onChange={(event) => onFieldChange('title', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Date de début</span>
              <input
                type="date"
                value={editForm.startDate}
                onChange={(event) => onFieldChange('startDate', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Date de fin</span>
              <input
                type="date"
                value={editForm.endDate}
                onChange={(event) => onFieldChange('endDate', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Lieu</span>
              <input
                type="text"
                value={editForm.location}
                onChange={(event) => onFieldChange('location', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Description</span>
              <textarea
                value={editForm.description}
                onChange={(event) => onFieldChange('description', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Prix (€)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={editForm.price}
                onChange={(event) => onFieldChange('price', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
          </>
        )}
        <div className="flex gap-4 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded button-hover" disabled={loading || !hasEvents}>
            {loading ? 'Modification...' : 'Mettre à jour'}
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
