import React from 'react';

export default function AddPhotoModal({
  open,
  onClose,
  onSubmit,
  uploading,
  fileRef,
  previewImages,
  onRemovePreview,
  onDragOver,
  onDrop,
  onFileChange,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
      <form
        onSubmit={onSubmit}
        className="bg-[#232323] p-8 rounded-2xl w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Ajouter une photo</h2>

        <div
          className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white transition"
          onClick={() => fileRef.current.click()}
        >
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <p className="text-gray-300">
            <span className="text-white underline">Cliquez pour parcourir</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG, WEBP...</p>
        </div>

        {previewImages.length > 0 && (
          <div className="mt-4 relative">
            <img
              src={previewImages[0]}
              alt="preview"
              className="rounded-xl border border-gray-600 w-full h-auto object-cover"
            />
            <button
              type="button"
              onClick={onRemovePreview}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full px-2 py-1 text-xs transition"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={uploading || previewImages.length === 0}
            className={`flex-1 py-2 rounded font-semibold transition ${
              uploading || previewImages.length === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {uploading ? "Ajout..." : "Ajouter"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-2 rounded button-hover"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
