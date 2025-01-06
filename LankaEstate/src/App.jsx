import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Sales from './pages/Sales';
import Rentals from './pages/Rentals';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  const [wishlist, setWishlist] = useState(() => {
    // Initialize wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Handle wishlist toggle
  const handleWishlistToggle = (property) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.some((item) => item.id === property.id)
        ? prevWishlist.filter((item) => item.id !== property.id)
        : [...prevWishlist, property];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Clear wishlist
  const onClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  return (
    <div>
      <Navigation
        wishlist={wishlist}
        onWishlistToggle={handleWishlistToggle}
        onClearWishlist={onClearWishlist}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales onWishlistToggle={handleWishlistToggle} wishlist={wishlist} />} />
        <Route path="/rentals" element={<Rentals onWishlistToggle={handleWishlistToggle} wishlist={wishlist} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onWishlistToggle={handleWishlistToggle} />} />
        <Route path="/property/:id" element={<PropertyDetails onWishlistToggle={handleWishlistToggle} wishlist={wishlist} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
