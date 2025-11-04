import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";
import Footer from "../components/Footer";
import { AuthContext } from "./AuthContext/AuthContext";

export default function AlbumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeletePhoto, setShowDeletePhoto] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const token = localStorage.getItem("adminToken");

  // Charger l'album
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement de l'album");
        const data = await res.json();
        setAlbum(data);
      } catch (err) {
        setError("Impossible de charger l'album");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  // Ajouter des photos
  const handleAddPhotos = async (e) => {
    e.preventDefault();
    if (!fileRef.current.files.length) return alert("Sélectionne une photo");
    const formData = new FormData();
    formData.append("photos", fileRef.current.files[0]);
    try {
      setUploading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${id}/photos`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur upload");
      const data = await res.json();
      setAlbum(data.album);
      fileRef.current.value = "";
      setPreviewImages([]);
    } catch (err) {
      setError("Erreur lors de l’ajout de la photo");
    } finally {
      setUploading(false);
    }
  };

  // Gérer fichiers sélectionnés / drag & drop
  const handleFiles = (files) => {
    const validFile = files.find((f) => f.type.startsWith("image/"));
    if (!validFile) return;
    setPreviewImages([URL.createObjectURL(validFile)]);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(validFile);
    fileRef.current.files = dataTransfer.files;
  };

  const removePreview = () => setPreviewImages([]);

  if (loading) return <p className="text-center mt-20 text-white">Chargement...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="bg-[#1D1D1B] min-h-screen text-white flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <nav>
        <Navbar />
      </nav>

      <main className="flex flex-col items-center grow p-6">
        <h1
          className="album-details-title font-bold underline tracking-custom mb-10 text-center whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ textOverflow: 'ellipsis' }}
        >
          {album.title}
        </h1>

        {/* Formulaire ajout photo pour admin */}
        {isAuthenticated && (
          <form
            onSubmit={handleAddPhotos}
            className="bg-[#2D2D2D] p-8 rounded-2xl mb-10 w-full max-w-3xl shadow-xl"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(Array.from(e.dataTransfer.files));
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Ajouter une photo à cet album</h2>

            <div
              className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white transition"
              onClick={() => fileRef.current.click()}
            >
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
              />
              <p className="text-gray-300">
                <span className="text-white underline">Cliquez pour parcourir vos images</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Formats acceptés : JPG, PNG, WEBP...</p>
            </div>

            {/* Prévisualisation */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="relative group">
                  <img
                    src={previewImages[0]}
                    alt="preview"
                    className="rounded-xl border border-gray-600 w-full h-auto object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePreview}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={uploading || previewImages.length === 0}
                className={`px-8 py-3 rounded-full font-semibold transition ${
                  uploading || previewImages.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {uploading ? "Ajout en cours..." : "Ajouter la photo"}
              </button>
            </div>
          </form>
        )}

        {/* Galerie */}
        {album.photos.length === 0 ? (
          <p className="text-gray-400 mt-10 italic">Aucune photo pour le moment 📷</p>
        ) : (
          <div className="columns-1 sm:columns-2 gap-6 w-full max-w-6xl space-y-6">
            {album.photos.map((photo, index) => (
              <div key={index} className="flex flex-col items-center break-inside-avoid">
                {/* Conteneur image */}
                <div className="overflow-hidden rounded-2xl border-4 border-white w-full">
                  <img
                    src={photo}
                    alt={`photo-${index}`}
                    className="w-full h-auto transition-transform duration-300 hover:scale-105 cursor-pointer rounded-2xl"
                    loading="lazy"
                    onClick={() => setSelectedImage(photo)}
                  />
                </div>

                {/* Bouton supprimer en dehors du conteneur */}
                {isAuthenticated && (
                  <button
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
                    onClick={() => {
                      setPhotoToDelete(photo);
                      setShowDeletePhoto(true);
                    }}
                  >
                    Supprimer
                  </button>
                )}

                {/* Modale suppression photo */}
                {showDeletePhoto && photoToDelete === photo && (
                  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeInBg">
                    <div className="bg-[#232323] p-8 rounded-2xl text-center w-full max-w-md animate-modalPop shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                      <h2 className="text-xl font-bold mb-4 text-red-500">Supprimer cette photo ?</h2>
                      <p className="text-gray-300 mb-6">Cette action est irréversible.</p>
                      <div className="flex justify-center gap-4">
                        <button
                          className="bg-red-600 text-white px-5 py-2 rounded button-hover"
                          onClick={async () => {
                            try {
                              const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${id}/photos`, {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ photoUrl: photoToDelete }),
                              });
                              if (!res.ok) throw new Error('Erreur lors de la suppression');
                              const data = await res.json();
                              setAlbum(data.album);
                              setShowDeletePhoto(false);
                              setPhotoToDelete(null);
                            } catch (err) {
                              alert('Erreur lors de la suppression de la photo');
                            }
                          }}
                          disabled={uploading}
                        >
                          {uploading ? 'Suppression...' : 'Supprimer'}
                        </button>
                        <button
                          className="bg-gray-500 text-white px-5 py-2 rounded button-hover"
                          onClick={() => {
                            setShowDeletePhoto(false);
                            setPhotoToDelete(null);
                          }}
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modale plein écran */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full p-4">
              <img
                src={selectedImage}
                alt="fullscreen"
                className="w-full h-auto max-h-[90vh] object-contain rounded-2xl border-4 border-white shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-gray-300"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-10 bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold"
        >
          Retour
        </button>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
