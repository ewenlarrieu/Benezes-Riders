import React, { useContext } from 'react';
import Navbar from '../components/navBar';
import { AuthContext } from './AuthContext/AuthContext';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import './styles/responsive.css'; // 👈 important : importer ton fichier responsive

export default function Photos() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      className="min-h-screen bg-[#1D1D1B] text-white"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <nav>
        <Navbar />
      </nav>

      {isAuthenticated && (
        <div className="admin-section w-full mt-5 px-5 relative">
          {/* Texte admin */}
          <div className="admin-label text-2xl font-bold">
            <p>admin</p>
          </div>

          {/* Boutons centrés */}
          <div className="admin-buttons flex justify-center mt-5 space-x-6 flex-wrap">
            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group">
              <span>Ajouter un album</span>
              <Plus size={20} className="transition-transform duration-200 group-hover:rotate-90 group-hover:text-green-600" />
            </button>

            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group">
              <span>Supprimer un album</span>
              <Trash2 size={20} className="transition-transform duration-200 group-hover:scale-110 group-hover:text-red-600" />
            </button>

            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center space-x-2 group">
              <span>Modifier un album</span>
              <Edit3 size={20} className="transition-transform duration-200 group-hover:rotate-12 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
      )}

      <h1 className="tracking-custom font-bold underline text-5xl text-center mt-20">
        GALERIE PHOTOS
      </h1>
    </div>
  );
}
