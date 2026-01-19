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

  // Afficher le prix ou "Gratuit"
  const displayPrice = registerEvent?.price === 0 ? 'Gratuit' : `${registerEvent?.price} €`;
  const isFree = registerEvent?.price === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
      >
        <h2 className="text-xl font-bold mb-2">
          Inscription à {registerEvent?.title || "l'événement"}
        </h2>

        {/* Affichage du prix */}
        <div className="bg-[#1D1D1B] p-3 rounded border border-white/20">
          <p className="text-center text-lg">
            <span className="text-white/70">Prix : </span>
            <span className="font-bold text-white">{displayPrice}</span>
          </p>
        </div>

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
            placeholder="exemple@email.fr"
            className="p-2 rounded bg-[#1D1D1B] text-white border"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Téléphone (optionnel)</span>
          <input
            type="text"
            value={registerForm.phone}
            onChange={(event) => onFieldChange('phone', event.target.value)}
            placeholder="Ex: 06 12 34 56 78"
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
            className="bg-green-600 text-white px-4 py-2 rounded button-hover flex-1"
            disabled={loading || Boolean(success)}
          >
            {loading 
              ? 'Redirection...' 
              : isFree 
                ? "Je m'inscris" 
                : 'Payer et s\'inscrire'}
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
