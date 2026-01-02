import React, { useState } from 'react'
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './styles/responsive/contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({
          fullname: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Messages de succès ou d'erreur */}
        {success && (
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <div className="bg-green-600 text-white p-4 rounded-lg text-center font-semibold">
              {success}
            </div>
          </div>
        )}
        {error && (
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center font-semibold">
              {error}
            </div>
          </div>
        )}

        {/* Formulaire de contact */}
        <section className="flex justify-center px-6 pb-20" aria-label="Formulaire de contact">
          <form className="w-full max-w-4xl bg-[#232323] border-2 border-white rounded-2xl p-8" onSubmit={handleSubmit} aria-label="Formulaire pour nous contacter">
            <div className="mb-6">
              <label htmlFor="fullname" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Nom et Prénom :</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Nom et Prénom"
                required
                aria-required="true"
                disabled={loading}
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20 disabled:opacity-50"
              />
               <label htmlFor="email" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Email :</label>
               <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre Adresse Email"
                required
                aria-required="true"
                disabled={loading}
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20 disabled:opacity-50"
              />
               <label htmlFor="subject" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Objet :</label>
               <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet du message"
                required
                aria-required="true"
                disabled={loading}
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-20 disabled:opacity-50"
              />
              <label htmlFor="message" className="contact-form-label block text-left mb-5 font-semibold tracking-custom">Message :</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message"
                rows="8"
                required
                aria-required="true"
                disabled={loading}
                className="contact-form-input w-full bg-[#232323] text-white border-2 border-white rounded-xl placeholder-gray-400 tracking-custom focus:outline-none focus:border-gray-300 transition mb-15 resize-vertical disabled:opacity-50"
              />
              <div className="flex justify-center ">
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Envoyer le message de contact"
                  className="contact-form-button relative overflow-hidden bg-[#1E1E1E] text-white font-bold rounded-full
                             border-2 border-white
                             tracking-custom
                             drop-shadow-[0_8px_8px_rgba(0,0,0,0.85)]
                             transition-all duration-500 ease-out
                             hover:text-[#1E1E1E] hover:bg-white hover:scale-105 hover:border-[#1E1E1E]
                             text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#1E1E1E] disabled:hover:text-white"
                >
                  {loading ? 'ENVOI EN COURS...' : 'ENVOYER LE MESSAGE'}
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
