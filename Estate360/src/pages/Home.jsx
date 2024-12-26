import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';
import Footer from '../components/Footer';

function Home() {
    return (
        <div>
            <Navigation />
            <Hero />
            <Carousel />
            <Trending />
            <Footer />
        </div>
    );
}

export default Home;
