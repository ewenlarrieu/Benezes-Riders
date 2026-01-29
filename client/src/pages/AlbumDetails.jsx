import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import AdminSection from "../components/AdminSection";
import { Plus } from "lucide-react";
import AddPhotoModal from "../components/albumDetails/AddPhotoModal";
import DeletePhotoModal from "../components/albumDetails/DeletePhotoModal";
import PhotoGrid from "../components/albumDetails/PhotoGrid";
import { albumService } from "../services/albumService";

export default function AlbumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeletePhoto, setShowDeletePhoto] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const { isAuthenticated, authFetch } = useContext(AuthContext);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileRef = useRef();

  // Charger l'album
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await albumService.getAlbumById(id);
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
    if (!selectedFiles.length) return alert("Sélectionne au moins une photo");
    const formData = new FormData();
    // Ajouter toutes les photos sélectionnées
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });
    try {
      setUploading(true);
      const data = await albumService.addPhotos(id, formData, authFetch);
      setAlbum(data.album);
      fileRef.current.value = "";
      setPreviewImages([]);
      setSelectedFiles([]);
      setShowAddPhoto(false);
    } catch (err) {
      setError("Erreur lors de l'ajout des photos");
    } finally {
      setUploading(false);
    }
  };

  // Gérer fichiers sélectionnés / drag & drop
  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!validFiles.length) return;
    
    // Filtrer les doublons (même nom ET même taille)
    const newFiles = validFiles.filter(newFile => {
      return !selectedFiles.some(existingFile => 
        existingFile.name === newFile.name && existingFile.size === newFile.size
      );
    });
    
    if (!newFiles.length) return; // Tous les fichiers sont déjà présents
    
    // Créer des previews pour les nouvelles images uniquement
    const newPreviews = newFiles.map(f => URL.createObjectURL(f));
    setPreviewImages(prev => [...prev, ...newPreviews]);
    
    // Accumuler les fichiers
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removePreview = () => {
    setPreviewImages([]);
    setSelectedFiles([]);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // Supprimer une photo
  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;
    try {
      const data = await albumService.deletePhoto(id, photoToDelete, authFetch);
      setAlbum(data.album);
      setShowDeletePhoto(false);
      setPhotoToDelete(null);
    } catch (err) {
      alert('Erreur lors de la suppression de la photo');
    }
  };

  if (loading) return <p className="text-center mt-20 text-white">Chargement...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="bg-[#1D1D1B] min-h-screen text-white flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <nav>
        <Navbar />
      </nav>

      {/* Section admin */}
      {isAuthenticated && (
        <AdminSection>
          <button
            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
            onClick={() => setShowAddPhoto(true)}
          >
            <span>Ajouter des photos</span>
            <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600" />
          </button>
        </AdminSection>
      )}

      <main className="flex flex-col items-center grow p-6">
        <h1
          className="album-title font-bold underline tracking-custom mb-10 text-center whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ textOverflow: 'ellipsis' }}
        >
          {album.title}
        </h1>

        {/* Galerie */}
        <PhotoGrid
          photos={album.photos}
          isAuthenticated={isAuthenticated}
          onPhotoClick={(photo) => setSelectedImage(photo)}
          onDeleteClick={(photo) => {
            setPhotoToDelete(photo);
            setShowDeletePhoto(true);
          }}
        />

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
                loading="lazy"
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

      <AddPhotoModal
        open={showAddPhoto}
        onClose={() => {
          setShowAddPhoto(false);
          removePreview();
        }}
        onSubmit={handleAddPhotos}
        uploading={uploading}
        fileRef={fileRef}
        previewImages={previewImages}
        onRemovePreview={removePreview}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(Array.from(e.dataTransfer.files));
        }}
        onFileChange={(e) => handleFiles(Array.from(e.target.files))}
      />

      <DeletePhotoModal
        open={showDeletePhoto}
        photoToDelete={photoToDelete}
        onClose={() => {
          setShowDeletePhoto(false);
          setPhotoToDelete(null);
        }}
        onConfirm={handleDeletePhoto}
        uploading={uploading}
      />
    </div>
  );
}
