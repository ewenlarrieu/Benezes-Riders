import React from 'react';
import { useNavigate} from 'react-router-dom';

export default function Footer() {
     const navigate = useNavigate();
  return (
    <footer className="bg-[#343433] text-white py-10 mt-20">
      {/* Liens de navigation */}
      <ul className="flex flex-wrap justify-center gap-10 sm:gap-14 md:gap-20 lg:gap-28 tracking-custom text-lg font-medium text-center">
        <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        onClick={() => navigate('/')}>
          ACCUEIL
        </li>
        <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        onClick={() => navigate('/photos')}>
          PHOTOS
        </li>
        <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
         onClick={() => navigate('/evenements')}>
          ÉVÉNEMENTS
        </li>
        <li className="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
         onClick={() => navigate('/contact')}>
          CONTACT
        </li>
      </ul>

      {/* Texte principal */}
      <p className="tracking-custom text-center text-2xl sm:text-xl md:text-2xl font-semibold mt-10">
        CLUB DES BENEZES RIDERS
      </p>

      {/* Email responsive */}
      <p className="tracking-custom text-center text-lg sm:text-base md:text-xl font-semibold mt-4 underline wrap-break-word px-4 leading-snug">
        Benezesriders164@gmail.com
      </p>

      {/* Logo Facebook */}
      <div className="flex justify-center mt-8">
        <a
          href="https://www.facebook.com/profile.php?id=61578358867025&locale=fr_FR" // Mets ici l'URL de ta page Facebook
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/Facebook-logo.png"
            alt="Logo facebook"
            className="w-12 h-12 cursor-pointer transition-transform duration-300 hover:scale-110 hover:drop-shadow-lg"
          />
        </a>
      </div>

      {/* Copyright */}
      <p className="tracking-custom font-semibold text-lg sm:text-xl md:text-2xl text-center mt-5 opacity-80">
        © 2025 Benezes Riders – Tous droits réservés
      </p>
    </footer>
  );
}
