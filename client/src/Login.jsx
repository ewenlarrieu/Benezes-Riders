import React from 'react';
import Navbar from '../components/navBar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <div
      className="min-h-screen bg-[#1D1D1B] text-white flex flex-col"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <nav>
        <Navbar />
      </nav>

      <main className="flex flex-col items-center justify-center grow mt-20 px-4 sm:px-6 md:px-10">
        {/* --- Titre responsive --- */}
        <h1 className="tracking-custom text-center text-3xl sm:text-4xl md:text-5xl underline font-bold mb-10 sm:mb-14 md:mb-18">
          CONNECTEZ-VOUS
        </h1>

        {/* --- Grand conteneur de connexion responsive --- */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-[#3939394f] border-2 border-white rounded-[20px] p-6 sm:p-10 md:p-14 shadow-xl">
          {/* Champ pseudo */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 tracking-custom">Pseudo</p>
            <input
              type="text"
              placeholder="Entrez votre pseudo"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg bg-[#1D1D1B] text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:ring-white text-base sm:text-lg"
            />
          </div>

          {/* Champ mot de passe */}
          <div className="mb-8 sm:mb-10">
            <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 tracking-custom">Mot de passe</p>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg bg-[#1D1D1B] text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:ring-white text-base sm:text-lg"
            />
          </div>

          {/* Bouton centré */}
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              className="overflow-hidden bg-[#1E1E1E] text-white font-bold py-3 sm:py-4 px-8 sm:px-10 
                         rounded-full border-2 border-white tracking-custom text-base sm:text-lg
                         drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                         transition-all duration-500 ease-out
                         hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]"
            >
              CONNEXION
            </button>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
