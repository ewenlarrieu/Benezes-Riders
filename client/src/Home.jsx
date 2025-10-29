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
        {/* Hero section */}
        <section className="hero-section relative px-0 py-0">
          <img
            src="/img/img1.png"
            alt="image de fond 1"
            className="w-screen h-auto"
          />

          <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 text-center">
            <h1 className="text-white font-bold tracking-custom text-[70px] flex flex-col items-center gap-2 drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]">
              <span>ASSOCIATION</span>
              <span>MOTO</span>
              <span>BENEZES RIDERS</span>
            </h1>
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

        {/* About Section */}
        <section className="about-section relative mt-10 bg-[#1D1D1B] min-h-[700px] py-20 px-12">
          <img
            src="/img/Logo-2.png"
            alt="logo"
            className="absolute right-5 -top-20 w-[400px] h-[400px] object-contain opacity-90 z-10"
          />

          {/* Contenu textuel */}
          <div className="relative z-20 max-w-[850px]">
            <h2 className="tracking-custom font-bold text-5xl underline text-white mb-12">
              QUI SOMMES NOUS ?
            </h2>

            <div className="space-y-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <p className="tracking-custom font-light text-3xl leading-relaxed">
                <span className="font-bold">Benezes Riders</span>, c'est plus qu'un
                club : c'est une bande de passionnés qui partagent la même envie de
                liberté, de routes ouvertes et de{' '}
                <span className="font-bold">bonne humeur</span>.
              </p>

              <p className="tracking-custom font-light text-3xl leading-relaxed">
                <span className="font-bold">Fondé en ...</span>, le club est
                aujourd'hui une vraie famille de motards qui se retrouvent tout au
                long de l'année pour rouler, échanger et surtout vivre de{' '}
                <span className="font-bold">bons moments.</span>
              </p>

              <p className="tracking-custom font-light text-3xl leading-relaxed">
                Ici, pas de prise de tête, juste la{' '}
                <span className="font-bold">passion</span> et le{' '}
                <span className="font-bold">respect</span> entre motards. 🏍️🤘
              </p>
            </div>
          </div>
          <img
            src="/img/image-3.png"
            alt="image about section"
            className="about-image absolute right-0 top-[250px] w-[650px] h-[500px] object-contain z-10 translate-x-0.5"
          />
        </section>
        <section className='Equipe mt-20 px-12 py-20'>
          <h2 className='tracking-custom font-bold text-5xl text-center underline text-white mb-6'>MEMBRES DE L'EQUIPE</h2>
          <p className='tracking-custom text-3xl text-center mt-9 text-white mb-16' style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ceux qui font tourner les moteurs des Benezes Riders
          </p>
          
          {/* Conteneur principal avec bordure blanche, fond et bordures arrondies */}
          <div className='border-2 border-white bg-[#2F2F2C] rounded-3xl p-16 max-w-8xl mx-auto'>
            {/* Grille des 4 cartes membres */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
              
              {/* Carte membre 1 */}
              <div className='flex flex-col items-center'>
                <h3 className='text-white text-xl font-bold mb-4 tracking-custom text-center'>NOM (OU SURNOM)</h3>
                {/* Triple bordure - bordure extérieure blanche */}
                <div className='bg-white rounded-2xl p-1'>
                  {/* Triple bordure - bordure du milieu (fond gris) */}
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    {/* Triple bordure - bordure intérieure blanche */}
                    <div className='bg-white rounded-xl p-1'>
                      {/* Carré intérieur pour la photo */}
                      <div className='w-52 h-52 bg-gray-600 rounded-lg flex items-center justify-center'>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 2 */}
              <div className='flex flex-col items-center'>
                <h3 className='text-white text-xl font-bold mb-4 tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='w-52 h-52 bg-gray-600 rounded-lg flex items-center justify-center'>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 3 */}
              <div className='flex flex-col items-center'>
                <h3 className='text-white text-xl font-bold mb-4 tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='w-52 h-52 bg-gray-600 rounded-lg flex items-center justify-center'>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte membre 4 */}
              <div className='flex flex-col items-center'>
                <h3 className='text-white text-xl font-bold mb-4 tracking-custom text-center'>NOM (OU SURNOM)</h3>
                <div className='bg-white rounded-2xl p-1'>
                  <div className='bg-[#2F2F2C] rounded-2xl p-1'>
                    <div className='bg-white rounded-xl p-1'>
                      <div className='w-52 h-52 bg-gray-600 rounded-lg flex items-center justify-center'>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
