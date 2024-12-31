import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Sales from './pages/Sales';
import Rentals from './pages/Rentals';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import PropertyDetails from './pages/PropertyDetails';
import { WishlistProvider } from './components/WishlistContext';

function App() {
  return (
    <WishlistProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </WishlistProvider>
  );
}

export default App;