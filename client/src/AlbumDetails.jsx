import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navBar";
import Footer from "../components/Footer";
import { AuthContext } from "./AuthContext/AuthContext";

export default function AlbumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const token = localStorage.getItem("adminToken");

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

  const handleAddPhotos = async (e) => {
    e.preventDefault();
    if (!fileRef.current.files.length) return alert("Sélectionne au moins une photo");
    const formData = new FormData();
    for (const file of fileRef.current.files) {
      formData.append("photos", file);
    }
    try {
      setUploading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${id}/photos`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Erreur upload");
      const data = await res.json();
      setAlbum(data.album); // Met à jour l’état local avec les nouvelles photos
      fileRef.current.value = "";
    } catch (err) {
      setError("Erreur lors de l’ajout des photos");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-20 text-white">Chargement...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="bg-[#1D1D1B] min-h-screen text-white flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <nav>
        <Navbar />
      </nav>

      <main className="flex flex-col items-center grow p-6">
        <h1 className="text-4xl font-bold underline tracking-custom mb-10 text-center">
          {album.title}
        </h1>

        {isAuthenticated && (
          <form onSubmit={handleAddPhotos} className="bg-[#2D2D2D] p-6 rounded-2xl mb-10">
            <p className="mb-2 font-semibold">Ajouter des photos :</p>
            <input type="file" ref={fileRef} multiple accept="image/*" className="block mb-4 text-white" />
            <button
              type="submit"
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
            >
              {uploading ? "Ajout en cours..." : "Ajouter"}
            </button>
          </form>
        )}

        {album.photos.length === 0 ? (
          <p className="text-gray-400 mt-10 italic">Aucune photo pour le moment 📷</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {album.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`photo-${index}`}
                className="rounded-xl border-2 border-white hover:scale-105 transition-transform duration-200"
              />
            ))}
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
