import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import AlbumGrid from '../components/albums/AlbumGrid';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/responsive/photo.css';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import AdminSection from '../components/AdminSection';
import CreateAlbumModal from '../components/albums/CreateAlbumModal';
import EditAlbumModal from '../components/albums/EditAlbumModal';
import DeleteAlbumModal from '../components/albums/DeleteAlbumModal';
import { albumService } from '../services/albumService';

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
        const data = await albumService.getAllAlbums();
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
      const newAlbum = await albumService.createAlbum(formData, authFetch);
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
      await albumService.deleteAlbum(selectedAlbum._id, authFetch);
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
      const updated = await albumService.updateAlbumCover(selectedAlbum._id, formData, authFetch);
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
          <AdminSection>
            <button
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
              onClick={() => setShowCreate(true)}
            >
              <span>Ajouter un album</span>
              <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600" />
            </button>
          </AdminSection>
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

      <CreateAlbumModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        loading={loading}
        error={error}
        titleRef={titleRef}
        coverRef={coverRef}
      />

      <EditAlbumModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setSelectedAlbum(null);
        }}
        onSubmit={handleEditCover}
        loading={loading}
        error={error}
        selectedAlbum={selectedAlbum}
        editTitleRef={editTitleRef}
        editCoverRef={editCoverRef}
      />

      <DeleteAlbumModal
        open={showDelete}
        onClose={() => {
          setShowDelete(false);
          setSelectedAlbum(null);
        }}
        onConfirm={handleDelete}
        loading={loading}
        selectedAlbum={selectedAlbum}
      />
    </div>
  );
}
