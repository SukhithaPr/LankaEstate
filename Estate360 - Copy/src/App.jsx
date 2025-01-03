import './App.css';
import React, { useState } from 'react';
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
  const [wishlist, setWishlist] = useState([]);

  const handleWishlistToggle = (property) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === property.id)) {
        // Remove property if it's already in the wishlist
        return prevWishlist.filter((item) => item.id !== property.id);
      } else {
        // Add property to the wishlist
        return [...prevWishlist, property];
      }
    });
  };

  const onClearWishlist = () => {
    setWishlist([]);
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
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
