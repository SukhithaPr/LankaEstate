import React from 'react';
// Importing the Hero component
import Hero from '../components/Hero';
// Importing the Carousel component
import Carousel from '../components/Carousel';
// Importing the Trending component
import Trending from '../components/Trending';

function Home() {
    return (
        <div>
            {/* Rendering the Hero component */}
            <Hero />
            {/* Rendering the Carousel component */}
            <Carousel />
            {/* Rendering the Trending component */}
            <Trending />
        </div>
    );
}

export default Home;
