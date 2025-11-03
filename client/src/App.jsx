import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Photos from "./Photos";
import Events from './Events'
import Contact from './Contact'
import Login from "./Login";
import AlbumDetails from "./AlbumDetails";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/albums/:id" element={<AlbumDetails />} />
         <Route path="/evenements" element={<Events />} />
         <Route path="/contact" element={<Contact />} />
           <Route path="/connexion" element={<Login />} />
         
      </Routes>
    </Router>
  );
};

export default App;