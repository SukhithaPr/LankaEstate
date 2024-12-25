import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Properties from '../components/Properties';
import Footer from '../components/Footer';

function Home() {
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

export default Home;
