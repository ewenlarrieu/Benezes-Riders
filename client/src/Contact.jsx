import React from 'react'
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './styles/responsive/contact.css'

export default function Contact() {
  return (
    <div className="bg-[#1D1D1B] text-white min-h-screen flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <nav>
        <Navbar/>
      </nav>
      
      <main className="grow">
        <section aria-labelledby="contact-heading">
          <h1 id="contact-heading" className="contact-title tracking-custom font-bold underline text-center mt-20">
            CONTACTEZ NOUS
          </h1>
          <div className='contact-description mt-12 flex flex-col items-center gap-10 px-6 pb-20 font-bold tracking-custom text-center'>
            <p>Une question ?</p>
            <p>Remplissez le formulaire ci-dessous, on vous répondra vite !</p>
          </div>
        </section>

        {/* Formulaire de contact */}
        <section className="flex justify-center px-6 pb-20" aria-label="Formulaire de contact">
          <form className="w-full max-w-4xl bg-[#232323] border-2 border-white rounded-2xl p-8" method="post" aria-label="Formulaire pour nous contacter">
            <div className="mb-6">
              <label htmlFor="fullname" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Nom et Prénom :</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Nom et Prénom"
                required
                aria-required="true"
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20"
              />
               <label htmlFor="email" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Email :</label>
               <input
                type="email"
                id="email"
                name="email"
                placeholder="Votre Adresse Email"
                required
                aria-required="true"
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20"
              />
               <label htmlFor="subject" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Objet :</label>
               <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Objet du message"
                required
                aria-required="true"
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20"
              />
              <label htmlFor="message" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Message :</label>
              <textarea
                id="message"
                name="message"
                placeholder="Votre message"
                rows="8"
                required
                aria-required="true"
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-15 resize-vertical"
              />
              <div className="flex justify-center ">
                <button
                  type="submit"
                  aria-label="Envoyer le message de contact"
                  className="contact-form-button relative overflow-hidden bg-[#1E1E1E] text-white font-bold rounded-full
                             border-2 border-white
                             tracking-custom
                             drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                             transition-all duration-500 ease-out
                             hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]
                             text-center "
                >
                  ENVOYER LE MESSAGE
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <footer>
            <Footer/>
          </footer>
    </div>
  )
}
