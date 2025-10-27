import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate
  return (
    <header className="bg-[#1D1D1B] text-white py-4 shadow-md w-full">
      <nav className="flex items-center justify-between w-full px-4"   style={{ fontFamily: 'Poppins, sans-serif'}}>
        <div>
          <img
            src="/img/logo.png"
            alt="Logo Benezes Riders"
            className="h-12 w-auto"
          />
        </div>
        <ul className="flex gap-20 text-lg mx-auto font-semibold tracking-custom  ">
          <li>
            <a href="/" className='underline-animation transition-colors duration-300 hover:text-gray-300'>ACCUEIL</a>
          </li>
          <li>
            <a href="/photos" className='underline-animation transition-colors duration-300 hover:text-gray-300'>PHOTOS</a>
          </li>
          <li>
            <a href="/evenements" className='underline-animation transition-colors duration-300 hover:text-gray-300'>ÉVÉNEMENTS</a>
          </li>
          <li>
            <a href="/contact" className='underline-animation transition-colors duration-300 hover:text-gray-300'>CONTACT</a>
          </li>
        </ul>
        <div>
          <img
            alt="Admin"
            className="h-10 w-auto cursor-pointer hover:opacity-60 transition-opacity"
          />
        </div>
      </nav>
    </header>
  );
}
