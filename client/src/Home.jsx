import React from 'react';
import NavBar from '../components/navBar';
import './styles/responsive.css';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#1D1D1B]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <NavBar />
      <main>
        <section className="hero-section relative px-0 py-0">
          <img
            src="/img/img1.png"
            alt="image de fond 1"
            className="w-screen h-auto"
          />

          {/* Conteneur centré */}
          <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 text-center">
            <h1 className="text-white font-bold tracking-custom text-[71px] flex flex-col items-center gap-2 drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]">
              <span>ASSOCIATION</span>
              <span>MOTO</span>
              <span>BENEZES RIDERS</span>
            </h1>

            {/* Bouton stylisé */}
            <button
              className="relative overflow-hidden bg-[#1E1E1E] text-white font-bold py-4 px-10 rounded-full
                         tracking-custom text-lg
                         drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                         transition-all duration-500 ease-out
                         hover:text-[#1E1E1E] hover:bg-white hover:scale-105"
            >
              PROCHAIN ÉVÉNEMENT
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
