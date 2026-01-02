import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import AlbumGrid from './components/AlbumGrid';
import { AuthContext } from './AuthContext/AuthContext';
import './styles/responsive/photo.css';
import { Plus, Trash2, Edit3 } from 'lucide-react';

export default function Photos() {
  const { isAuthenticated, authFetch } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const titleRef = useRef();
  const coverRef = useRef();
  const editTitleRef = useRef();
  const editCoverRef = useRef();

  const navigate = useNavigate();

  // Charger les albums
  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/albums`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : Array.isArray(data.albums) ? data.albums : [];
        setAlbums(list);
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
    if (!titleRef.current.value || !coverRef.current.files[0]) {
      setError('Titre et image de couverture requis');
      return;
    }
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('cover', coverRef.current.files[0]);
    try {
      setLoading(true);
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/albums`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      const newAlbum = await res.json();
      setAlbums((prev) => [newAlbum, ...prev]);
      setShowCreate(false);
      titleRef.current.value = '';
      coverRef.current.value = '';
    } catch (err) {
      setError("Erreur lors de la création de l'album");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un album
  const handleDelete = async () => {
    if (!selectedAlbum) return;
    setError('');
    try {
      setLoading(true);
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/albums/${selectedAlbum._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setAlbums((prev) => prev.filter((a) => a._id !== selectedAlbum._id));
      setShowDelete(false);
      setSelectedAlbum(null);
    } catch (err) {
      setError('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  // Modifier titre/couverture
  const handleEditCover = async (e) => {
    e.preventDefault();
    if (!selectedAlbum) return;
    setError('');
    const formData = new FormData();
    const newTitle = editTitleRef.current.value;
    const newCover = editCoverRef.current.files[0];
    if (!newTitle && !newCover) {
      setError('Renseignez un nouveau titre ou une nouvelle image');
      return;
    }
    if (newTitle && newTitle !== selectedAlbum.title) {
      formData.append('title', newTitle);
    }
    if (newCover) {
      formData.append('cover', newCover);
    }
    try {
      setLoading(true);
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/albums/${selectedAlbum._id}/cover`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Erreur lors de la modification');
      const updated = await res.json();
      setAlbums((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
      setShowEdit(false);
      setSelectedAlbum(null);
    } catch (err) {
      setError('Erreur lors de la modification de la cover');
    } finally {
      setLoading(false);
    }
  };

  const renderActions = (album) =>
    isAuthenticated ? (
      <div className="flex gap-4 mt-3">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
          onClick={() => {
            setSelectedAlbum(album);
            setShowDelete(true);
          }}
        >
          <Trash2 size={20} /> Supprimer
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          onClick={() => {
            setSelectedAlbum(album);
            setShowEdit(true);
            setTimeout(() => {
              if (editTitleRef.current) {
                editTitleRef.current.value = album.title;
              }
              if (editCoverRef.current) {
                editCoverRef.current.value = '';
              }
            }, 0);
          }}
        >
          <Edit3 size={20} /> Modifier
        </button>
      </div>
    ) : null;

  return (
    <div className="bg-[#1D1D1B] text-white flex flex-col min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600" />
              </button>
            </div>
          </div>
        )}

        {/* TITRE GALERIE */}
        <h1 className="photos-title tracking-custom font-bold underline text-center">GALERIE PHOTOS</h1>

        {/* AFFICHAGE DES ALBUMS */}
        {loading ? (
          <p className="text-center mt-8">Chargement des albums...</p>
        ) : (
          <AlbumGrid albums={albums} onAlbumClick={(id) => navigate(`/albums/${id}`)} renderActions={renderActions} />
        )}

        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
      </main>

      <footer>
        <Footer />
      </footer>

      {/* MODALE CREATION */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form
            onSubmit={handleCreate}
            className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
          >
            <h2 className="text-xl font-bold mb-2">Créer un album</h2>
            <p>Titre de l'album :</p>
            <input ref={titleRef} type="text" placeholder="Titre de l'album" className="p-2 rounded bg-[#1D1D1B] text-white border" required />
            <p>Image de couverture :</p>
            <input ref={coverRef} type="file" accept="image/*" className="p-2 rounded bg-[#1D1D1B] text-white border" required />
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded button-hover" disabled={loading}>
                {loading ? 'Création...' : 'Créer'}
              </button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded button-hover" onClick={() => setShowCreate(false)}>
                Annuler
              </button>
            </div>
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </div>
      )}

      {/* MODALE MODIFICATION */}
      {showEdit && selectedAlbum && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form
            onSubmit={handleEditCover}
            className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
          >
            <h2 className="text-xl font-bold mb-2">Modifier l'album</h2>
            <p>Titre de l'album :</p>
            <input ref={editTitleRef} type="text" defaultValue={selectedAlbum.title} placeholder="Titre de l'album" className="p-2 rounded bg-[#1D1D1B] text-white border" />
            <p>Image de couverture :</p>
            <input ref={editCoverRef} type="file" accept="image/*" className="p-2 rounded bg-[#1D1D1B] text-white border" />
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded button-hover" disabled={loading}>
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

      {/* MODALE SUPPRESSION */}
      {showDelete && selectedAlbum && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeInBg">
          <div className="bg-[#232323] p-8 rounded-2xl text-center w-full max-w-md animate-modalPop shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            <h2 className="text-xl font-bold mb-4 text-red-500">Supprimer cet album ?</h2>
            <p className="text-gray-300 mb-6">Cette action est irréversible.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-600 text-white px-5 py-2 rounded button-hover" onClick={handleDelete} disabled={loading}>
                {loading ? 'Suppression...' : 'Supprimer'}
              </button>
              <button
                className="bg-gray-500 text-white px-5 py-2 rounded button-hover"
                onClick={() => {
                  setShowDelete(false);
                  setSelectedAlbum(null);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
