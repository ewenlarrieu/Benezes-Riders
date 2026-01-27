import React from 'react';

export default function PhotoGrid({
  photos,
  isAuthenticated,
  onPhotoClick,
  onDeleteClick,
}) {
  if (photos.length === 0) {
    return <p className="text-gray-400 mt-10 italic">Aucune photo pour le moment 📷</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 gap-6 w-full max-w-6xl space-y-6">
      {photos.map((photo, index) => (
        <div key={index} className="flex flex-col items-center break-inside-avoid">
          {/* Conteneur image */}
          <div className="overflow-hidden rounded-2xl border-4 border-white w-full">
            <img
              src={photo}
              alt={`photo-${index}`}
              className="w-full h-auto transition-transform duration-300 hover:scale-105 cursor-pointer rounded-2xl"
              loading="lazy"
              onClick={() => onPhotoClick(photo)}
            />
          </div>

          {/* Bouton supprimer en dehors du conteneur */}
          {isAuthenticated && (
            <button
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
              onClick={() => onDeleteClick(photo)}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
