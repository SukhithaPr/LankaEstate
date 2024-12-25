import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import Properties from './components/Properties';

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <Carousel />
      <Properties />
      <Footer />
    </div>
  );
}

export default App;
