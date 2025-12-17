import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { AuthContext } from './AuthContext/AuthContext';
import { Plus, Trash2, Edit3 } from 'lucide-react';


export default function Photos() {
  const { isAuthenticated } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const titleRef = useRef();
  const coverRef = useRef();
  const editCoverRef = useRef();
  const editTitleRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  // Charger les albums
  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/albums`);
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        setError('Erreur lors du chargement des albums');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  // Créer un album
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('cover', coverRef.current.files[0]);
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/albums`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      const newAlbum = await res.json();
      setAlbums([newAlbum, ...albums]);
      setShowCreate(false);
    } catch (err) {
      setError("Erreur lors de la création de l'album");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un album
  const handleDelete = async (id) => {
    setError('');
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setAlbums(albums.filter((a) => a._id !== id));
      setShowDelete(false);
      setSelectedAlbum(null);
    } catch (err) {
      setError('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  // Modifier la cover
  const handleEditCover = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    if (editCoverRef.current.files[0]) {
      formData.append('cover', editCoverRef.current.files[0]);
    }
    if (editTitleRef.current.value && editTitleRef.current.value !== selectedAlbum.title) {
      formData.append('title', editTitleRef.current.value);
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/albums/${selectedAlbum._id}/cover`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Erreur lors de la modification');
      const updated = await res.json();
      setAlbums(albums.map((a) => (a._id === updated._id ? updated : a)));
      setShowEdit(false);
      setSelectedAlbum(null);
    } catch (err) {
      setError('Erreur lors de la modification de la cover');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#1D1D1B] text-white flex flex-col min-h-screen"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* NAVBAR */}
      <nav>
        <Navbar />
      </nav>

      <main className="grow">
        {/* SECTION ADMIN */}
        {isAuthenticated && (
          <div className="admin-section w-full mt-5 px-5 relative">
            <div className="admin-label text-2xl font-bold">
              <p>admin</p>
            </div>

            <div className="admin-buttons flex justify-center mt-5 space-x-6 flex-wrap">
              <button
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
                onClick={() => setShowCreate(true)}
              >
                <span>Ajouter un album</span>
                <Plus
                  size={20}
                  className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600"
                />
              </button>
            </div>

            {/* MODALE CRÉATION */}
            {showCreate && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
                <form
                  onSubmit={handleCreate}
                  className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
                >
                  <h2 className="text-xl font-bold mb-2">Créer un album</h2>
                  <p>Titre de l'album :</p>
                  <input
                    ref={titleRef}
                    type="text"
                    placeholder="Titre de l'album"
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                    required
                  />
                  <p>Image de couverture :</p>
                  <input
                    ref={coverRef}
                    type="file"
                    accept="image/*"
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                    required
                  />
                  <div className="flex gap-4 mt-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded button-hover" disabled={loading}>
                      {loading ? 'Création...' : 'Créer'}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                      onClick={() => setShowCreate(false)}
                    >
                      Annuler
                    </button>
                  </div>
                  {error && <p className="text-red-400">{error}</p>}
                </form>
              </div>
            )}

            {/* MODALE MODIFICATION COVER */}
            {showEdit && selectedAlbum && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
                <form
                  onSubmit={handleEditCover}
                  className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
                >
                  <h2 className="text-xl font-bold mb-2">Modifier l'album</h2>
                  <p>Titre de l'album :</p>
                  <input
                    ref={editTitleRef}
                    type="text"
                    defaultValue={selectedAlbum.title}
                    placeholder="Titre de l'album"
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                  <p>Image de couverture :</p>
                  <input
                    ref={editCoverRef}
                    type="file"
                    accept="image/*"
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                  <div className="flex gap-4 mt-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded button-hover">
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                      onClick={() => {
                        setShowEdit(false);
                        setSelectedAlbum(null);
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                  {error && <p className="text-red-400">{error}</p>}
                </form>
              </div>
            )}
          </div>
        )}

        {/* TITRE GALERIE */}
        <h1 className="photos-title tracking-custom font-bold underline text-center">
          GALERIE PHOTOS
        </h1>

        {/* AFFICHAGE DES ALBUMS */}
        <div className="albums-container flex flex-col items-center gap-24 px-6 pb-20">
          {albums.length === 0 && !loading ? (
            <div className="no-albums-message text-center flex flex-col items-center justify-center">
              <p className="no-albums-text text-gray-400 tracking-wider bg-[#232323] px-8 py-6 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-gray-700">
                Aucun album photo pour le moment 📷
              </p>
              <p className="no-albums-subtext text-gray-500 italic">
                Revenez bientôt pour découvrir de nouvelles photos.
              </p>
            </div>
          ) : (
            albums.map((album) => (
              <div
                key={album._id}
                className="album-item w-full max-w-5xl flex flex-col items-center"
              >
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
                  onClick={()=> navigate(`/albums/${album._id}`)}
                >
                  VOIR LES PHOTOS
                </button>
              </div>


                {isAuthenticated && (
                  <div className="flex gap-4 mt-3">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
                      onClick={() => {
                        setShowDelete(true);
                        setSelectedAlbum(album);
                      }}
                    >
                      <Trash2 size={20} /> Supprimer
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
                      onClick={() => {
                        setShowEdit(true);
                        setSelectedAlbum(album);
                      }}
                    >
                      <Edit3 size={20} /> Modifier
                    </button>
                  </div>
                )}
      {/* MODALE SUPPRESSION */}
      {showDelete && selectedAlbum && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeInBg">
          <div className="bg-[#232323] p-8 rounded-2xl text-center w-full max-w-md animate-modalPop shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            <h2 className="text-xl font-bold mb-4 text-red-500">Supprimer cet album ?</h2>
            <p className="text-gray-300 mb-6">Cette action est irréversible.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 text-white px-5 py-2 rounded button-hover" onClick={() => handleDelete(selectedAlbum._id)} disabled={loading}>
                {loading ? 'Suppression...' : 'Supprimer'}
              </button>
              <button className="bg-gray-500 text-white px-5 py-2 rounded button-hover" onClick={() => setShowDelete(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
              </div>
            ))
          )}
        </div>

        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
