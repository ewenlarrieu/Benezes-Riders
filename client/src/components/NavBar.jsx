import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('ACCUEIL');

  useEffect(() => {
    switch (location.pathname) {
      case '/photos':
        setCurrentPage('PHOTOS');
        break;
      case '/evenements':
        setCurrentPage('ÉVÉNEMENTS');
        break;
      case '/contact':
        setCurrentPage('CONTACT');
        break;
      case '/connexion':
        setCurrentPage('CONNEXION');
        break;
      default:
        setCurrentPage('ACCUEIL');
    }
  }, [location.pathname]);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/connexion');
    }
  };

  return (
    <header className="bg-[#1D1D1B] text-white py-4 shadow-md w-full relative z-50">
      <nav
        className="flex items-center justify-between w-full px-4"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {/* --- Logo principal --- */}
        <div>
          <img
            src="/img/Logo.png"
            alt="Logo Benezes Riders"
            className="h-12 w-auto"
            loading="eager"
          />
        </div>

        {/* --- Menu desktop --- */}
        <ul className="hidden md:flex gap-20 text-lg mx-auto font-semibold tracking-custom">
          <li
            className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/')}
          >
            ACCUEIL
          </li>
          <li
            className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/photos')}
          >
            PHOTOS
          </li>
          <li
            className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/evenements')}
          >
            ÉVÉNEMENTS
          </li>
          <li
            className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => navigate('/contact')}
          >
            CONTACT
          </li>
        </ul>

        {/* --- Logo admin + texte --- */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/img/Admin-logo.png"
            alt="Admin"
            className="h-10 w-auto cursor-pointer hover:opacity-60 transition-opacity"
            onClick={handleAdminClick}
            loading="lazy"
          />
          <span className="text-sm font-semibold mt-1">
            {isAuthenticated ? 'Déconnexion' : 'Connexion'}
          </span>
        </div>

        {/* --- Menu mobile (titre + flèche) --- */}
        <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 top-4">
          <div className="relative inline-flex items-center bg-[#2A2A28] rounded-md px-3 py-2">
            <span className="text-white cursor-default pr-3">{currentPage}</span>
            <span
              className="text-gray-400 cursor-pointer hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ▼
            </span>
          </div>
        </div>
      </nav>

      {/* --- Menu mobile déroulant --- */}
      {menuOpen && (
        <div className="md:hidden bg-[#1D1D1B] text-white flex flex-col items-center py-3 space-y-3 animate-fade-in">
          <div
            className="cursor-pointer text-lg hover:text-gray-300"
            onClick={() => {
              navigate('/');
              setMenuOpen(false);
            }}
          >
            ACCUEIL
          </div>
          <div
            className="cursor-pointer text-lg hover:text-gray-300"
            onClick={() => {
              navigate('/photos');
              setMenuOpen(false);
            }}
          >
            PHOTOS
          </div>
          <div
            className="cursor-pointer text-lg hover:text-gray-300"
            onClick={() => {
              navigate('/evenements');
              setMenuOpen(false);
            }}
          >
            ÉVÉNEMENTS
          </div>
          <div
            className="cursor-pointer text-lg hover:text-gray-300"
            onClick={() => {
              navigate('/contact');
              setMenuOpen(false);
            }}
          >
            CONTACT
          </div>
        </div>
      )}
    </header>
  );
}
