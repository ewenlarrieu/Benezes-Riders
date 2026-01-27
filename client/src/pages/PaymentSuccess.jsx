import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { eventService } from '../services/eventService';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id')?.trim();

    if (!sessionId) {
      setStatus('error');
      setMessage('Session de paiement introuvable');
      return;
    }

    // Vérifier le paiement auprès du serveur
    const verifyPayment = async () => {
      try {
        const data = await eventService.verifyPayment(sessionId);
        
        if (data.success) {
          setStatus('success');
          setMessage('Votre inscription a été confirmée avec succès !');
        } else {
          setStatus('error');
          setMessage('Le paiement n\'a pas pu être vérifié');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setStatus('error');
        setMessage('Une erreur est survenue lors de la vérification');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#1D1D1B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <NavBar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {status === 'loading' && (
            <div className="bg-[#232323] p-8 rounded-2xl text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Vérification du paiement...</h2>
              <p className="text-white/70">Veuillez patienter</p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-[#232323] p-8 rounded-2xl text-center">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold text-white mb-4">Paiement réussi !</h2>
              <p className="text-white/90 text-lg mb-6">{message}</p>
              <p className="text-white/70 mb-8">Un email de confirmation vous a été envoyé.</p>
              <button
                onClick={() => navigate('/evenements')}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all duration-300"
              >
                Retour aux événements
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-[#232323] p-8 rounded-2xl text-center">
              <div className="text-red-500 text-6xl mb-4">✕</div>
              <h2 className="text-3xl font-bold text-white mb-4">Erreur</h2>
              <p className="text-white/90 text-lg mb-8">{message}</p>
              <button
                onClick={() => navigate('/evenements')}
                className="bg-gray-600 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition-all duration-300"
              >
                Retour aux événements
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
