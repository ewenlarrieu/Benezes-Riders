import React, { useContext, useEffect, useMemo, useState } from 'react';
import Navbar from '../components/NavBar';
import { AuthContext } from './AuthContext/AuthContext';
import './styles/responsive/events.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Plus, Trash2, Edit3 } from 'lucide-react';

export default function Events() {
  const { isAuthenticated } = useContext(AuthContext);
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
  const token = localStorage.getItem('adminToken');

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

  const fetchUpcomingEvents = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`);
      const data = await res.json();
      const events = Array.isArray(data.events) ? data.events : [];
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${deleteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      setRegisterError('Aucun ?v?nement s?lectionn?');
      return;
    }
    if (!registerForm.name || !registerForm.email) {
      setRegisterError('Nom et email requis');
      return;
    }

    setRegisterLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/events/${registerEvent._id}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerForm),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      setRegisterSuccess('Inscription envoy?e !');
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
    } catch (err) {
      console.error(err);
      setRegisterError(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const upcomingList = useMemo(
    () =>
      upcomingEvents.filter((event) => !nextEvent || event._id !== nextEvent._id),
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

      {showRegistrations && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn px-4">
          <div className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-2xl shadow-2xl transform scale-95 animate-slideUp">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Inscriptions</h2>
              <button
                type="button"
                className="text-sm text-gray-300 underline"
                onClick={() => {
                  setShowRegistrations(false);
                  setRegistrationsEventId('');
                }}
              >
                Fermer
              </button>
            </div>
            {eventOptions.length === 0 ? (
              <p className="text-gray-300">Aucun événement disponible.</p>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span>Événement</span>
                  <select
                    value={registrationsEventId}
                    onChange={(event) => setRegistrationsEventId(event.target.value)}
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  >
                    {eventOptions.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title} — {new Date(event.startDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </label>
                {(() => {
                  const current = eventOptions.find((ev) => ev._id === registrationsEventId) || eventOptions[0];
                  const list = current?.registrations || [];
                  if (list.length === 0) {
                    return <p className="text-gray-300">Aucune inscription pour cet événement.</p>;
                  }
                  return (
                    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
                      {list.map((reg, idx) => (
                        <div key={idx} className="border border-white/10 rounded-xl p-3 bg-[#1D1D1B]">
                          <div className="font-semibold">{reg.name}</div>
                          <div className="text-sm text-gray-300">{reg.email}</div>
                          {reg.phone ? <div className="text-sm text-gray-400">Tel: {reg.phone}</div> : null}
                          {reg.message ? <div className="text-sm text-gray-400 mt-1">Note: {reg.message}</div> : null}
                          {reg.createdAt ? (
                            <div className="text-xs text-gray-500 mt-1">
                              Le {new Date(reg.createdAt).toLocaleString()}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form onSubmit={handleCreateEvent} className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp">
            <h2 className="text-xl font-bold mb-2">Créer un événement</h2>
            <label className="flex flex-col gap-2">
              <span>Titre</span>
              <input name="title" type="text" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <label className="flex flex-col gap-2">
              <span>Date de début</span>
              <input name="startDate" type="date" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <label className="flex flex-col gap-2">
              <span>Date de fin</span>
              <input name="endDate" type="date" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <label className="flex flex-col gap-2">
              <span>Lieu</span>
              <input name="location" type="text" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <label className="flex flex-col gap-2">
              <span>Description</span>
              <textarea name="description" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <label className="flex flex-col gap-2">
              <span>Prix (€)</span>
              <input name="price" type="number" min="0" step="0.01" required className="p-2 rounded bg-[#1D1D1B] text-white border" />
            </label>
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded button-hover" disabled={formLoading}>
                {formLoading ? 'Création...' : 'Créer'}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                onClick={() => {
                  setShowCreate(false);
                  setFormError('');
                }}
              >
                Annuler
              </button>
            </div>
            {formError && <p className="text-red-400">{formError}</p>}
          </form>
        </div>
      )}

      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form onSubmit={handleEditSubmit} className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp">
            <h2 className="text-xl font-bold mb-2">Modifier un événement</h2>
            {eventOptions.length === 0 ? (
              <p className="text-gray-300">Aucun événement à modifier.</p>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span>Événement</span>
                  <select
                    value={editId}
                    onChange={(event) => setEditId(event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  >
                    {eventOptions.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title} — {new Date(event.startDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span>Titre</span>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(event) => handleEditChange('title', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Date de début</span>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(event) => handleEditChange('startDate', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Date de fin</span>
                  <input
                    type="date"
                    value={editForm.endDate}
                    onChange={(event) => handleEditChange('endDate', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Lieu</span>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(event) => handleEditChange('location', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Description</span>
                  <textarea
                    value={editForm.description}
                    onChange={(event) => handleEditChange('description', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span>Prix (€)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.price}
                    onChange={(event) => handleEditChange('price', event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  />
                </label>
              </>
            )}
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded button-hover" disabled={editLoading || eventOptions.length === 0}>
                {editLoading ? 'Modification...' : 'Mettre à jour'}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                onClick={() => {
                  setShowEdit(false);
                  setEditError('');
                  setEditId('');
                }}
              >
                Annuler
              </button>
            </div>
            {editError && <p className="text-red-400">{editError}</p>}
          </form>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form onSubmit={handleDeleteEvent} className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp">
            <h2 className="text-xl font-bold mb-2">Supprimer un événement</h2>
            {eventOptions.length === 0 ? (
              <p className="text-gray-300">Aucun événement à supprimer.</p>
            ) : (
              <>
                <label className="flex flex-col gap-2">
                  <span>Événement</span>
                  <select
                    value={deleteId}
                    onChange={(event) => setDeleteId(event.target.value)}
                    required
                    className="p-2 rounded bg-[#1D1D1B] text-white border"
                  >
                    {eventOptions.map((event) => (
                      <option key={event._id} value={event._id}>
                        {event.title} — {new Date(event.startDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="text-sm text-red-300">Cette action est irréversible.</p>
              </>
            )}
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded button-hover" disabled={deleteLoading || eventOptions.length === 0}>
                {deleteLoading ? 'Suppression...' : 'Supprimer'}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                onClick={() => {
                  setShowDelete(false);
                  setDeleteError('');
                  setDeleteId('');
                }}
              >
                Annuler
              </button>
            </div>
            {deleteError && <p className="text-red-400">{deleteError}</p>}
          </form>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
          <form
            onSubmit={handleRegisterSubmit}
            className="bg-[#232323] p-8 rounded-2xl flex flex-col gap-4 w-full max-w-md shadow-2xl transform scale-95 animate-slideUp"
          >
            <h2 className="text-xl font-bold mb-2">
              Inscription à {registerEvent?.title || "l'événement"}
            </h2>
            <label className="flex flex-col gap-2">
              <span>Nom</span>
              <input
                type="text"
                value={registerForm.name}
                onChange={(event) => handleRegisterChange('name', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Email</span>
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) => handleRegisterChange('email', event.target.value)}
                required
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Téléphone (optionnel)</span>
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(event) => handleRegisterChange('phone', event.target.value)}
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Message (optionnel)</span>
              <textarea
                value={registerForm.message}
                onChange={(event) => handleRegisterChange('message', event.target.value)}
                className="p-2 rounded bg-[#1D1D1B] text-white border"
              />
            </label>
            <div className="flex gap-4 mt-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded button-hover"
                disabled={registerLoading || Boolean(registerSuccess)}
              >
                {registerLoading ? 'Envoi...' : "Je m'inscris"}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded button-hover"
                onClick={() => {
                  setShowRegister(false);
                  setRegisterError('');
                  setRegisterSuccess('');
                }}
              >
                Annuler
              </button>
            </div>
            {registerError && <p className="text-red-400">{registerError}</p>}
            {registerSuccess && <p className="text-green-400">{registerSuccess}</p>}
          </form>
        </div>
      )}

      <h1 className=" event-title tracking-custom font-bold underline text-center">NOS ÉVÉNEMENTS</h1>

      <div className="flex justify-center mt-10">
        <h2 className=" event-title-2 font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-10 py-3 text-2xl inline-block">
          PROCHAIN EVENEMENT
        </h2>
      </div>

      {/* SECTION IMAGE + EVENT */}
      <div className="relative w-full mt-10 event-image-container">
        <img src="/img/img1.png" alt="image de fond" className="rounded-2xl" />

        {/* Overlay pour texte */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {loading ? (
            <p className="text-white text-xl bg-black bg-opacity-50 p-4 rounded-xl">Chargement...</p>
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
                  <p className="text-white/90 next-event-content">{nextEvent.price} €</p>
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
            <p className="text-white text-xl bg-black bg-opacity-50 p-4 rounded-xl">Aucun événement à venir</p>
          )}
        </div>
      </div>

      {!upcomingLoading && upcomingList.length > 0 && (
        <>
          <div className="flex justify-center mt-10">
            <h2 className="event-title-2 font-bold text-center text-white drop-shadow-lg tracking-custom bg-[#2D2D2D] rounded-xl px-10 py-3 text-2xl inline-block">
              AUTRES EVENEMENTS A VENIR
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
      <AlbumsPhotos navigate={navigate} />
      <Footer />
    </div>
  );
}

function AlbumsPhotos({ navigate }) {
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/albums`)
      .then((res) => res.json())
      .then((data) => setAlbums(data))
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
          <p className="no-albums-subtext text-gray-500 italic">Revenez bientôt pour découvrir de nouvelles photos.</p>
        </div>
      ) : (
        albums.map((album) => (
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
