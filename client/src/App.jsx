import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/responsive/home.css';
import './styles/responsive/photo.css';
import './styles/responsive/events.css'

// Lazy loading des pages
const Home = lazy(() => import('./pages/Home'));
const Photos = lazy(() => import('./pages/Photos'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const AlbumDetails = lazy(() => import('./pages/AlbumDetails'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#1D1D1B] flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      <p className="text-white mt-4 font-semibold">Chargement...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;