import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './styles/responsive/home.css';

import { useNavigate} from 'react-router-dom';


export default function Home() {
   const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-[#1D1D1B]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <nav>

      <NavBar />
      </nav>
      <main>
        {/* Hero section */}
        <section className="hero-section relative">
          <img
            src="/img/img1.png"
            alt="image de fond 1"
            className="w-screen h-auto"
          />

          <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
            <h1 className="hero-title text-white font-bold tracking-custom flex flex-col items-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]">
              <span>ASSOCIATION</span>
              <span>MOTO</span>
              <span>BENEZES RIDERS</span>
            </h1>
            <button
              className="hero-button relative overflow-hidden bg-[#1E1E1E] text-white font-bold rounded-full
                         tracking-custom
                         drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                         transition-all duration-500 ease-out
                         hover:text-[#1E1E1E] hover:bg-white hover:scale-105"
            onClick={() => navigate('/evenements')}>
              PROCHAIN ÉVÉNEMENT
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section relative bg-[#1D1D1B]">
          <img
            src="/img/Logo-2.png"
            alt="logo"
            className="about-logo absolute opacity-90 z-10"
          />

          {/* Contenu textuel */}
          <div className="about-content relative z-20">
            <h2 className="about-title tracking-custom font-bold underline text-white">
              QUI SOMMES NOUS ?
            </h2>

            <div className="text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <p className="about-text tracking-custom font-light leading-relaxed">
                <span className="font-bold">Benezes Riders</span>, c'est plus qu'un
                club : c'est une bande de passionnés qui partagent la même envie de
                liberté, de routes ouvertes et de{' '}
                <span className="font-bold">bonne humeur</span>.
              </p>

              <p className="about-text tracking-custom font-light leading-relaxed">
                <span className="font-bold">Fondé en ...</span>, le club est
                aujourd'hui une vraie famille de motards qui se retrouvent tout au
                long de l'année pour rouler, échanger et surtout vivre de{' '}
                <span className="font-bold">bons moments.</span>
              </p>

              <p className="about-text tracking-custom font-light leading-relaxed">
                Ici, pas de prise de tête, juste la{' '}
                <span className="font-bold">passion</span> et le{' '}
                <span className="font-bold">respect</span> entre motards. 🏍️🤘
              </p>
            </div>
          </div>
          <img
            src="/img/image-3.png"
            alt="image about section"
            className="about-image absolute z-10"
          />
        </section>
        <section className='Equipe'>
          <h2 className='equipe-title tracking-custom font-bold text-center underline text-white'>MEMBRES DE L'EQUIPE</h2>
          <p className='equipe-text tracking-custom text-center text-white' style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ceux qui font tourner les moteurs des Benezes Riders
          </p>
          
          {/* Conteneur principal avec bordure blanche, fond et bordures arrondies */}
          <div className='equipe-container border-2 border-white bg-[#2F2F2C] rounded-3xl mx-auto'>
            {/* Grille des 4 cartes membres */}
            <div className='equipe-grid grid gap-10'>
              
              {/* Carte membre 1 */}
              <div className='member-card flex flex-col items-center'>
                <h3 className='member-name text-white font-bold tracking-custom text-center'>NOM (OU SURNOM)</h3>
                {/* Triple bordure - bordure extérieure blanche */}
                <div className='bg-white rounded-2xl p-1'>
                  {/* Triple bordure - bordure du milieu (fond gris) */}
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    {/* Triple bordure - bordure intérieure blanche */}
                    <div className='bg-white rounded-xl p-1'>
                      {/* Carré intérieur pour la photo */}
                      <div className='member-photo bg-gray-600 rounded-lg flex items-center justify-center'>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 2 */}
              <div className='member-card flex flex-col items-center'>
                <h3 className='member-name text-white font-bold tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='member-photo bg-gray-600 rounded-lg flex items-center justify-center'>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 3 */}
              <div className='member-card flex flex-col items-center'>
                <h3 className='member-name text-white font-bold tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='member-photo bg-gray-600 rounded-lg flex items-center justify-center'>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 4 */}
              <div className='member-card flex flex-col items-center'>
                <h3 className='member-name text-white font-bold tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='member-photo bg-gray-600 rounded-lg flex items-center justify-center'>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        

            </div>
          </div>
        </section>
<section className="event relative">
 <h2 className="tracking-custom font-bold underline text-center text-white event-title">
  HIVERNALES À VENIR
</h2>


  <div className="relative w-full flex justify-center items-center">
    {/* Image de fond */}
    <div className="relative w-full">
      <img
        src="/img/image4.png"
        alt="image de fond hivernal"
        className="w-full object-cover"
      />

      {/* Contenu centré dans l’image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Carte effet glass */}
        <div
          className="rounded-[40px] border-2 border-white
                     backdrop-blur-md bg-linear-to-br from-white/80 to-[#393939]/20
                     flex items-center justify-center text-white font-semibold shadow-lg"
        >
          <p className="event-text text-center tracking-custom">Aucun événement à venir</p>
        </div>

        {/* Bouton sous la carte */}
        <button
          className="event-button overflow-hidden bg-[#1E1E1E] text-white font-bold
                     rounded-full border-2 border-white tracking-custom
                     drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                     transition-all duration-500 ease-out
                     hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]"
        >
          PLUS DE DÉTAILS
        </button>
      </div>
    </div>
  </div>
</section>
<section className='contact-class'>
    <h2 className='contact-section-title tracking-custom text-center font-bold underline'>CONTACTEZ NOUS</h2>
    <p className='contact-section-text tracking-custom text-center'>UNE QUESTION ?</p>
    <p className='contact-section-text tracking-custom text-center'>UN PROBLÈME ?</p>
    <div className="flex justify-center w-full">
      <button
        className="contact-section-button overflow-hidden bg-[#1E1E1E] text-white font-bold
                   rounded-full border-2 border-white tracking-custom
                   drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                   transition-all duration-500 ease-out
                   hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]"
                   onClick={() => navigate('/contact')}
      >
        CONTACTEZ NOUS
      </button>
    </div>
</section>
</main>
    <footer>
      <Footer/>
    </footer>
    </div>
  );
}
