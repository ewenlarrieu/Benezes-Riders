import React from 'react';

export default function AlbumGrid({
  albums,
  onAlbumClick,
  renderActions,
  emptyMessage = (
    <>
      <p className="no-albums-text text-gray-400 tracking-wider bg-[#232323] px-8 py-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-gray-700">
        Aucun album photo pour le moment 📷
      </p>
      <p className="no-albums-subtext text-gray-500 italic">
        Revenez bientôt pour découvrir de nouvelles photos.
      </p>
    </>
  ),
}) {
  if (!albums || albums.length === 0) {
    return (
      <div className="no-albums-message text-center flex flex-col items-center justify-center">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="albums-container flex flex-col items-center gap-24 px-6 pb-20">
      {albums.map((album) => (
        <div key={album._id} className="album-item w-full max-w-5xl flex flex-col items-center">
          <h3 className="album-title font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-6 py-2 inline-block">
            {album.title}
          </h3>
          <div className="album-image-container relative w-full group max-w-5xl">
            <img
              src={album.coverImage}
              alt={album.title}
              className="album-image w-full max-w-full h-auto rounded-2xl border-4 border-white transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-103 group-hover:shadow-xl group-hover:-translate-y-1"
            />
            <button
              className="album-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] text-white font-bold rounded-full tracking-custom transition-all duration-500 ease-out hover:text-[#1E1E1E] hover:bg-white hover:scale-105 shadow-lg z-10"
              type="button"
              onClick={() => onAlbumClick?.(album._id)}
            >
              VOIR LES PHOTOS
            </button>
          </div>
          {renderActions ? renderActions(album) : null}
        </div>
      ))}
    </div>
  );
}
