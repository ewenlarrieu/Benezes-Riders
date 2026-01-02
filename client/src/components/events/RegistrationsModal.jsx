import React from 'react';

export default function RegistrationsModal({
  open,
  onClose,
  eventOptions,
  registrationsEventId,
  onSelectChange,
}) {
  if (!open) return null;

  const hasEvents = eventOptions.length > 0;
  const current = hasEvents
    ? eventOptions.find((ev) => ev._id === registrationsEventId) || eventOptions[0]
    : null;
  const list = current?.registrations || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn px-4">
      <div className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-2xl shadow-2xl transform scale-95 animate-slideUp">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Inscriptions</h2>
          <button type="button" className="text-sm text-gray-300 underline" onClick={onClose}>
            Fermer
          </button>
        </div>
        {!hasEvents ? (
          <p className="text-gray-300">Aucun événement disponible.</p>
        ) : (
          <>
            <label className="flex flex-col gap-2">
              <span>Événement</span>
              <select
                value={registrationsEventId || current?._id}
                onChange={(event) => onSelectChange(event.target.value)}
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              >
                {eventOptions.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title} — {new Date(event.startDate).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </label>
            {list.length === 0 ? (
              <p className="text-gray-300">Aucune inscription pour cet événement.</p>
            ) : (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
                {list.map((reg, idx) => (
                  <div key={idx} className="border border-white/10 rounded-xl p-3 bg-[#1D1D1B]">
                    <div className="font-semibold">{reg.name}</div>
                    <div className="text-sm text-gray-300">{reg.email}</div>
                    {reg.phone ? <div className="text-sm text-gray-400">Tel: {reg.phone}</div> : null}
                    {reg.message ? <div className="text-sm text-gray-400 mt-1">Note: {reg.message}</div> : null}
                    {reg.createdAt ? (
                      <div className="text-xs text-gray-500 mt-1">
                        Le {new Date(reg.createdAt).toLocaleString()}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
