import React, { useContext, useEffect, useMemo, useState } from 'react';
import Navbar from '../components/NavBar';
import { AuthContext } from './AuthContext/AuthContext';
import './styles/responsive/events.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import CreateEventModal from './components/events/CreateEventModal';
import EditEventModal from './components/events/EditEventModal';
import DeleteEventModal from './components/events/DeleteEventModal';
import RegisterEventModal from './components/events/RegisterEventModal';
import RegistrationsModal from './components/events/RegistrationsModal';
import AlbumGrid from './components/AlbumGrid';

export default function Events() {
  const { isAuthenticated, authFetch } = useContext(AuthContext);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    price: '',
  });

  const [showRegister, setShowRegister] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [registrationsEventId, setRegistrationsEventId] = useState('');

  const navigate = useNavigate();

  const fetchNextEvent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/next`);
      const data = await res.json();
      setNextEvent(data.message ? null : data);
    } catch (err) {
      console.error(err);
      setNextEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const data = await res.json();
      const events = Array.isArray(data.events) ? data.events : Array.isArray(data) ? data : [];
      const today = new Date();
      const upcoming = events
        .filter((event) => new Date(event.startDate) >= today)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setUpcomingEvents(upcoming);
    } catch (err) {
      console.error(err);
      setUpcomingEvents([]);
    } finally {
      setUpcomingLoading(false);
    }
  };

  useEffect(() => {
    fetchNextEvent();
    fetchUpcomingEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    const formData = new FormData(e.target);
    const payload = {
      title: formData.get('title'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      location: formData.get('location'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
    };

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de la création de l'événement");
      }

      setShowCreate(false);
      e.target.reset();
      fetchNextEvent();
      fetchUpcomingEvents();
    } catch (err) {
      console.error(err);
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    if (!deleteId) {
      setDeleteError('Sélectionnez un événement à supprimer');
      return;
    }

    setDeleteError('');
    setDeleteLoading(true);

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/events/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de la suppression de l'événement");
      }

      setShowDelete(false);
      setDeleteId('');
      fetchNextEvent();
      fetchUpcomingEvents();
    } catch (err) {
      console.error(err);
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editId) {
      setEditError('Sélectionnez un événement à modifier');
      return;
    }

    setEditError('');
    setEditLoading(true);

    const payload = {
      ...editForm,
      price: Number(editForm.price),
    };

    try {
      const res = await authFetch(`${import.meta.env.VITE_API_URL}/events/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de la modification de l'événement");
      }

      setShowEdit(false);
      setEditId('');
      fetchNextEvent();
      fetchUpcomingEvents();
    } catch (err) {
      console.error(err);
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const openRegisterModal = (event) => {
    setRegisterEvent(event);
    setRegisterForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setRegisterError('');
    setRegisterSuccess('');
    setShowRegister(true);
  };

  const handleRegisterChange = (field, value) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerEvent?._id) {
      setRegisterError('Aucun événement sélectionné');
      return;
    }
    if (!registerForm.name || !registerForm.email) {
      setRegisterError('Nom et email requis');
      return;
    }

    // Validation basique de l'email pour Stripe
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      setRegisterError('Format d\'email invalide');
      return;
    }

    setRegisterLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    try {
      // Si l'événement est gratuit, inscription directe
      if (registerEvent.price === 0) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${registerEvent._id}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerForm),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Erreur lors de l'inscription");
        }

        setRegisterSuccess('Inscription envoyée !');
        setTimeout(() => {
          setShowRegister(false);
          setRegisterEvent(null);
          setRegisterForm({
            name: '',
            email: '',
            phone: '',
            message: '',
          });
          setRegisterSuccess('');
        }, 1200);
      } else {
        // Si l'événement est payant, créer une session Stripe
        const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: registerEvent._id,
            name: registerForm.name,
            email: registerForm.email,
            phone: registerForm.phone,
            message: registerForm.message,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Erreur lors de la création de la session de paiement");
        }

        const { url } = await res.json();
        
        // Rediriger vers la page de paiement Stripe
        window.location.href = url;
      }
    } catch (err) {
      console.error(err);
      setRegisterError(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const upcomingList = useMemo(
    () => upcomingEvents.filter((event) => !nextEvent || event._id !== nextEvent._id),
    [upcomingEvents, nextEvent]
  );

  const eventOptions = useMemo(
    () => (nextEvent ? [nextEvent, ...upcomingList] : [...upcomingList]),
    [nextEvent, upcomingList]
  );

  useEffect(() => {
    if (showDelete && eventOptions.length > 0 && !deleteId) {
      setDeleteId(eventOptions[0]._id);
    }
  }, [showDelete, eventOptions, deleteId]);

  useEffect(() => {
    if (showEdit && eventOptions.length > 0 && !editId) {
      setEditId(eventOptions[0]._id);
    }
  }, [showEdit, eventOptions, editId]);

  useEffect(() => {
    if (showRegistrations && eventOptions.length > 0 && !registrationsEventId) {
      setRegistrationsEventId(eventOptions[0]._id);
    }
  }, [showRegistrations, eventOptions, registrationsEventId]);

  useEffect(() => {
    const current = eventOptions.find((event) => event._id === editId);
    if (!current) return;
    setEditForm({
      title: current.title || '',
      startDate: current.startDate ? new Date(current.startDate).toISOString().slice(0, 10) : '',
      endDate: current.endDate ? new Date(current.endDate).toISOString().slice(0, 10) : '',
      location: current.location || '',
      description: current.description || '',
      price: current.price ?? '',
    });
  }, [editId, eventOptions]);

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#1D1D1B] text-white flex flex-col min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />
      {isAuthenticated && (
        <div className="admin-section w-full mt-5 px-5 relative">
          <div className="tracking-custom text-right text-2xl font-bold">admin</div>
          <div className="admin-buttons flex justify-center mt-5 space-x-6 flex-wrap">
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
              onClick={() => setShowCreate(true)}
            >
              <span>Créer un événement</span>
              <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600" />
            </button>
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
              onClick={() => {
                setShowEdit(true);
                setEditError('');
              }}
            >
              <span>Modifier un événement</span>
              <Edit3 size={20} className="transition-transform duration-200 group-hover:text-blue-600" />
            </button>
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
              onClick={() => {
                setShowDelete(true);
                setDeleteError('');
              }}
            >
              <span>Supprimer un événement</span>
              <Trash2 size={20} className="transition-transform duration-200 group-hover:text-red-600" />
            </button>
            <button
              type="button"
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group"
              onClick={() => setShowRegistrations(true)}
            >
              <span>Voir les inscriptions</span>
              <Edit3 size={20} className="transition-transform duration-200 group-hover:text-green-600 rotate-90" />
            </button>
          </div>
        </div>
      )}

      <CreateEventModal
        open={showCreate}
        onClose={() => {
          setShowCreate(false);
          setFormError('');
        }}
        onSubmit={handleCreateEvent}
        loading={formLoading}
        error={formError}
      />

      <EditEventModal
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setEditError('');
          setEditId('');
        }}
        onSubmit={handleEditSubmit}
        loading={editLoading}
        error={editError}
        eventOptions={eventOptions}
        editId={editId}
        onSelectChange={setEditId}
        editForm={editForm}
        onFieldChange={handleEditChange}
      />

      <DeleteEventModal
        open={showDelete}
        onClose={() => {
          setShowDelete(false);
          setDeleteError('');
          setDeleteId('');
        }}
        onSubmit={handleDeleteEvent}
        loading={deleteLoading}
        error={deleteError}
        eventOptions={eventOptions}
        deleteId={deleteId}
        onSelectChange={setDeleteId}
      />

      <RegisterEventModal
        open={showRegister}
        onClose={() => {
          setShowRegister(false);
          setRegisterError('');
          setRegisterSuccess('');
        }}
        onSubmit={handleRegisterSubmit}
        loading={registerLoading}
        error={registerError}
        success={registerSuccess}
        registerEvent={registerEvent}
        registerForm={registerForm}
        onFieldChange={handleRegisterChange}
      />

      <RegistrationsModal
        open={showRegistrations}
        onClose={() => {
          setShowRegistrations(false);
          setRegistrationsEventId('');
        }}
        eventOptions={eventOptions}
        registrationsEventId={registrationsEventId}
        onSelectChange={setRegistrationsEventId}
      />

      <h1 className="event-title tracking-custom font-bold underline text-center">NOS ÉVÉNEMENTS</h1>

      <div className="flex justify-center mt-10">
        <h2 className="event-title-2 font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-10 py-3 text-2xl inline-block">
          PROCHAIN ÉVÉNEMENT
        </h2>
      </div>

      {/* SECTION IMAGE + EVENT */}
      <div className="relative w-full mt-10 event-image-container">
        <img src="/img/img1.png" alt="image de fond" className="rounded-2xl" />

        {/* Overlay pour texte */}
        <div className="absolute inset-0 flex items-center justify-center">
          {loading ? (
            <p className="text-white text-xl bg-black/60 px-5 py-3 rounded-xl shadow-lg">Chargement...</p>
          ) : nextEvent ? (
            <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
              <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 text-center w-full tracking-custom shadow-lg flex flex-col items-center gap-8">
                {/* TITRE */}
                <h3 className="next-event-title font-bold underline uppercase text-white drop-shadow-md">
                  {nextEvent.title}
                </h3>

                {/* DATES */}
                <div className="text-white/90 text-xl flex flex-col items-center gap-2">
                  <span className="font-semibold text-3xl">DATE</span>

                  <div>
                    <span className="uppercase font-bold">DU</span>
                    <div className="next-event-content">{new Date(nextEvent.startDate).toLocaleDateString()}</div>
                  </div>

                  <div>
                    <span className="uppercase font-bold">AU</span>
                    <div className="next-event-content">{new Date(nextEvent.endDate).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* LIEU */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl font-semibold ">LIEU</span>
                  <p className="text-white/90 next-event-content">{nextEvent.location}</p>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl font-semibold ">DESCRIPTION</span>
                  <p className="text-white/80 next-event-content">{nextEvent.description}</p>
                </div>

                {/* PRIX */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl font-semibold ">PRIX</span>
                  <p className="text-white/90 next-event-content">
                    {nextEvent.price === 0 ? 'Gratuit' : `${nextEvent.price} €`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="event-signup-button bg-[#1E1E1E] text-white font-bold rounded-full tracking-custom transition-all duration-500 ease-out hover:text-[#1E1E1E] hover:bg-white hover:scale-105 shadow-lg px-8 py-3"
                onClick={() => openRegisterModal(nextEvent)}
              >
                S'INSCRIRE
              </button>
            </div>
          ) : (
            <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-6 text-center tracking-custom shadow-lg flex flex-col items-center gap-3 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white">Pas d'événement à venir</h3>
              <p className="text-white/80 text-sm text-center">Revenez bientôt pour découvrir le prochain rendez-vous.</p>
            </div>
          )}
        </div>
      </div>

      {!upcomingLoading && upcomingList.length > 0 && (
        <>
          <div className="flex justify-center mt-10">
            <h2 className="event-title-2 font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-10 py-3 text-2xl inline-block">
              AUTRES ÉVÉNEMENTS À VENIR
            </h2>
          </div>
          <div className="flex flex-col items-center gap-8 mt-8 px-6">
            {upcomingList.map((event) => (
              <div key={event._id} className="bg-[#232323] border border-white/10 rounded-2xl p-6 w-full max-w-3xl text-center tracking-custom shadow-lg">
                <h3 className="text-xl font-bold underline uppercase text-white">{event.title}</h3>
                <div className="mt-4 text-white/90 flex flex-col items-center gap-2">
                  <div className="text-sm">
                    <span className="uppercase font-bold">DU</span> {new Date(event.startDate).toLocaleDateString()}{' '}
                    <span className="uppercase font-bold">AU</span> {new Date(event.endDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm uppercase">{event.location}</div>
                </div>
                <button
                  type="button"
                  className="event-signup-button bg-[#1E1E1E] text-white font-bold rounded-full tracking-custom transition-all duration-500 ease-out hover:text-[#1E1E1E] hover:bg-white hover:scale-105 shadow-lg px-6 py-2 mt-5"
                  onClick={() => openRegisterModal(event)}
                >
                  S'INSCRIRE
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="event-title tracking-custom font-bold underline text-center uppercase">Événements passés</h2>

      {/* SECTION ALBUMS PHOTOS */}
      <AlbumsSection navigate={navigate} />
      <Footer />
    </div>
  );
}

function AlbumsSection({ navigate }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/albums`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAlbums(data);
        } else if (Array.isArray(data.albums)) {
          setAlbums(data.albums);
        } else {
          setAlbums([]);
        }
      })
      .catch(() => setError('Erreur lors du chargement des albums'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Chargement des albums...</p>;

  return (
    <>
      <AlbumGrid
        albums={albums}
        onAlbumClick={(id) => navigate(`/albums/${id}`)}
      />
      {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
    </>
  );
}
