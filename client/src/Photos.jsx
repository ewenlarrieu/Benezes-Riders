import React, { useContext } from 'react'
import Navbar from '../components/navBar'
import { AuthContext } from './AuthContext/AuthContext';


export default function Photos() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      {isAuthenticated && (
        <div className='tracking-custom text-right text-2xl font-bold mt-5 mr-5'>
          admin
        </div>
      )}
    </div>
  );
}
