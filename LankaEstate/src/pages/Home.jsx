import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';

function Home() {
    return (
        <div>
            <Hero />
            <Carousel />
            <Trending />
        </div>
    );
}

export default Home;
