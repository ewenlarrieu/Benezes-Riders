import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { AuthContext } from './AuthContext/AuthContext';
import './styles/responsive/events.css';
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit3 } from 'lucide-react';
import Footer from '../components/Footer';

export default function Events() {
  const { isAuthenticated } = useContext(AuthContext);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events/next`);
        const data = await res.json();
        setNextEvent(data.message ? null : data); // si pas d'événement, on met null
      } catch (err) {
        console.error(err);
        setNextEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNextEvent();
  }, []);

  return (
    <div className="bg-[#1D1D1B] text-white flex flex-col min-h-screen"
         style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />
      {isAuthenticated && (
         <div className="admin-section w-full mt-5 px-5 relative">
          <div className="tracking-custom text-right text-2xl font-bold">
            admin
          </div>
          <div className="admin-buttons flex justify-center mt-5 space-x-6 flex-wrap">
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
            >
              <span>Créer un événement</span>
              <Plus
                size={20}
                className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600"
              />
            </button>
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
            >
              <span>Modifier un événement</span>
              <Edit3
                size={20}
                className="transition-transform duration-200 group-hover:text-blue-600"
              />
            </button>
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
            >
              <span>Supprimer un événement</span>
              <Trash2
                size={20}
                className="transition-transform duration-200 group-hover:text-red-600"
              />
            </button>
          </div>
        </div>
        
      )}

      <h1 className=" event-title tracking-custom font-bold underline text-center">NOS EVENEMENTS</h1>

      <div className="flex justify-center mt-10">
        <h2 className=" event-title-2 font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-10 py-3 text-2xl inline-block">
          PROCHAIN EVENEMENT
        </h2>
      </div>

      {/* SECTION IMAGE + EVENT */}
      <div className="relative w-full mt-10 event-image-container">
        <img
          src="/img/img1.png"
          alt="image de fond"
          className="rounded-2xl"
        />

        {/* Overlay pour texte */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
  {loading ? (
    <p className="text-white text-xl bg-black bg-opacity-50 p-4 rounded-xl">
      Chargement...
    </p>
  ) : nextEvent ? (
     <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
   <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 text-center w-full tracking-custom shadow-lg flex flex-col items-center gap-8">
  
  {/* TITRE */}
  <h3 className="next-event-title font-bold underline uppercase text-white drop-shadow-md">
    {nextEvent.title}
  </h3>

  {/* DATES */}
  <div className="text-white/90 text-xl flex flex-col items-center gap-2">
    <span className="font-semibold  text-3xl">DATE</span>
    
    <div>
      <span className="uppercase font-bold">DU</span>
      <div className='next-event-content'>{new Date(nextEvent.startDate).toLocaleDateString()}</div>
    </div>
    
    <div>
      <span className="uppercase font-bold">AU</span>
      <div className='next-event-content'>{new Date(nextEvent.endDate).toLocaleDateString()}</div>
    </div>
  </div>

  {/* LIEU */}
  <div className='flex flex-col items-center gap-2'>
    <span className="text-3xl font-semibold ">LIEU</span>
    <p className="text-white/90 next-event-content">{nextEvent.location}</p>
  </div>

  {/* DESCRIPTION */}
  <div className='flex flex-col items-center gap-2'>
    <span className="text-3xl font-semibold ">DESCRIPTION</span>
    <p className="text-white/80 next-event-content">{nextEvent.description}</p>
  </div>

  {/* PRIX */}
  <div className='flex flex-col items-center gap-2'>
    <span className="text-3xl font-semibold ">PRIX</span>
    <p className="text-white/90 next-event-content">{nextEvent.price} €</p>
  </div>

 </div>
<button
    type="button"
    className="event-signup-button bg-[#1E1E1E] text-white font-bold rounded-full tracking-custom transition-all duration-500 ease-out hover:text-[#1E1E1E] hover:bg-white hover:scale-105 shadow-lg px-8 py-3"
  >
    S'INSCRIRE
  </button>
  </div>
  ) : (
    <p className="text-white text-xl bg-black bg-opacity-50 p-4 rounded-xl">
      Aucun événement à venir
    </p>
  )}
</div>
      </div>
      <h2 className='event-title tracking-custom font-bold underline text-center uppercase'>Événements passés</h2>

      {/* SECTION ALBUMS PHOTOS */}
      <AlbumsPhotos navigate={navigate} />
      <Footer/>
    </div>
  );
}

function AlbumsPhotos({ navigate }) {
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/albums`)
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(() => setError('Erreur lors du chargement des albums'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Chargement des albums...</p>;

  return (
    <div className="albums-container flex flex-col items-center gap-24 px-6 pb-20">
      {albums.length === 0 ? (
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
                onClick={() => navigate(`/albums/${album._id}`)}
              >
                VOIR LES PHOTOS
              </button>
            </div>
          </div>
        ))
      )}
      {error && <p className="text-red-400 mt-6 text-center">{error}</p>}

    </div>
    
  );
}
