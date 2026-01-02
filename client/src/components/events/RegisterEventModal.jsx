import React from 'react';

export default function RegisterEventModal({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  success,
  registerEvent,
  registerForm,
  onFieldChange,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2">
          Inscription à {registerEvent?.title || "l'événement"}
        </h2>
        <label className="flex flex-col gap-2">
          <span>Nom</span>
          <input
            type="text"
            value={registerForm.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            required
            className="p-2 rounded bg-[#1D1D1B] text-white border"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Email</span>
          <input
            type="email"
            value={registerForm.email}
            onChange={(event) => onFieldChange('email', event.target.value)}
            required
            className="p-2 rounded bg-[#1D1D1B] text-white border"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Téléphone (optionnel)</span>
          <input
            type="tel"
            value={registerForm.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            className="p-2 rounded bg-[#1D1D1B] text-white border"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Message (optionnel)</span>
          <textarea
            value={registerForm.message}
            onChange={(event) => onFieldChange('message', event.target.value)}
            className="p-2 rounded bg-[#1D1D1B] text-white border"
          />
        </label>
        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded button-hover"
            disabled={loading || Boolean(success)}
          >
            {loading ? 'Envoi...' : "Je m'inscris"}
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
        {success && <p className="text-green-400">{success}</p>}
      </form>
    </div>
  );
}
