import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../styles/responsive/home.css';
import { eventService } from '../services/eventService';
import { useNavigate} from 'react-router-dom';


export default function Home() {
   const navigate = useNavigate();
   const [nextEvent, setNextEvent] = useState(null);
   const [loading, setLoading] = useState(true);

   // Récupérer le prochain événement
   useEffect(() => {
     const fetchNextEvent = async () => {
       try {
         const data = await eventService.getNextEvent();
         setNextEvent(data.message ? null : data);
       } catch (err) {
         console.error('Erreur lors de la récupération de l\'événement:', err);
         setNextEvent(null);
       } finally {
         setLoading(false);
       }
     };
     fetchNextEvent();
   }, []);

   // Formater la date en français
   const formatDate = (dateString) => {
     const date = new Date(dateString);
     const options = { day: 'numeric', month: 'long', year: 'numeric' };
     return date.toLocaleDateString('fr-FR', options);
   };
  return (
    <div
      className="min-h-screen bg-[#1D1D1B]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <nav>

      <NavBar />
      </nav>
      <main>
 
        <section className="hero-section relative" aria-label="Section d'accueil">
          <img
            src="/img/img1.png"
            alt="Groupe de motards Benezes Riders sur la route"
            className="w-screen h-auto"
            loading="lazy"
          />

          <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
            <h1 className="hero-title text-white font-bold tracking-custom flex flex-col items-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]">
              <span>ASSOCIATION</span>
              <span>MOTO</span>
              <span>BENEZES RIDERS</span>
            </h1>
            <button
              className="boutons relative overflow-hidden bg-[#1E1E1E] text-white font-bold rounded-full
                         tracking-custom
                         drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                         transition-all duration-500 ease-out
                         hover:text-[#1E1E1E] hover:bg-white hover:scale-105"
              onClick={() => navigate('/evenements')}
              aria-label="Voir le prochain événement">
              PROCHAIN ÉVÉNEMENT
            </button>
          </div>
        </section>

      
        <section className="about-section relative bg-[#1D1D1B]" aria-label="À propos de Benezes Riders">
          <img
            src="/img/Logo-2.png"
            alt="Logo Benezes Riders - Club de motards"
            className="about-logo absolute opacity-90 z-10"
            loading="lazy"
          />

     
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
                <span className="font-bold">respect</span> entre motards. 
              </p>
            </div>
          </div>
          <img
            src="/img/image-3.png"
            alt="Motards du club Benezes Riders lors d'une sortie groupe"
            className="about-image absolute z-10"
            loading="lazy"
          />
        </section>
        <section className='Equipe' aria-label="Membres de l'équipe">
          <h2 className='equipe-title tracking-custom font-bold text-center underline text-white'>MEMBRES DE L'EQUIPE</h2>
          <p className='equipe-text tracking-custom text-center text-white' style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ceux qui font tourner les moteurs des Benezes Riders
          </p>
          
       
          <div className='equipe-container border-2 border-white bg-[#2F2F2C] rounded-3xl mx-auto'>
        
            <div className='equipe-grid grid gap-10'>
              
      
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
<section className="event relative" aria-label="Événements à venir">
 <h2 className="tracking-custom font-bold underline text-center text-white about-title uppercase">
  événement à venir
</h2>


  <div className="relative w-full flex justify-center items-center">

    <div className="relative w-full">
      <img
        src="/img/image4.png"
        alt="Paysage hivernal pour événement moto Benezes Riders"
        className="w-full object-cover"
        loading="lazy"
      />

   
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      
        <div
          className="event-card rounded-[10px] border-4 border-white/80
                     backdrop-blur-md bg-linear-to-br from-black/40 via-black/30 to-transparent
                     flex items-center justify-center text-white
                     shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                     transform transition-all duration-300 hover:scale-[1.02]"
        >
          {loading ? (
            <p className="text-center tracking-custom text-2xl font-light animate-pulse">Chargement...</p>
          ) : nextEvent ? (
            <div className="text-center tracking-custom w-full">
              <p className="event-card-title font-black uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {nextEvent.title}
              </p>
              <div className="event-card-date flex flex-col font-semibold">
                <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                   Du {formatDate(nextEvent.startDate)}
                </p>
                <p className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  au {formatDate(nextEvent.endDate)}
                </p>
              </div>
            </div>
          ) : (
            <p className="event-no-event-message text-center tracking-custom font-light opacity-80">
              Aucun événement à venir pour le moment
            </p>
          )}
        </div>

        
        {nextEvent && (
          <button
            onClick={() => navigate('/evenements')}
            className="boutons overflow-hidden bg-white text-[#1E1E1E] font-black
                       rounded-full border-4 border-white tracking-custom
                       shadow-[0_10px_30px_rgba(255,255,255,0.3)]
                       transform transition-all duration-300
                       hover:bg-[#1E1E1E] hover:text-white hover:scale-110 hover:shadow-[0_15px_40px_rgba(255,255,255,0.5)]"
            aria-label="Voir plus de détails sur l'événement"
          >
            PLUS DE DÉTAILS
          </button>
        )}
      </div>
    </div>
  </div>
</section>
<section className='contact-class' aria-label="Section de contact">
    <h2 className='contact-section-title tracking-custom text-center font-bold underline'>CONTACTEZ NOUS</h2>
    <p className='contact-section-text tracking-custom text-center'>UNE QUESTION ?</p>
    <p className='contact-section-text tracking-custom text-center mb-5'>UN PROBLÈME ?</p>
    <div className="flex justify-center w-full">
      <button
        className="boutons overflow-hidden bg-[#1E1E1E] text-white font-bold
                   rounded-full border-2 border-white tracking-custom
                   drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                   transition-all duration-500 ease-out
                   hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]"
        onClick={() => navigate('/contact')}
        aria-label="Accéder au formulaire de contact"
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
