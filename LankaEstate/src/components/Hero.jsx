// Hero component definition
function Hero() {
    return (
        // Main container section with padding
        <section className="container p-4">
            {/* Row with rounded corners, minimum height, and shadow */}
            <div className="row rounded-3 min-vh-60 shadow" style={{ backgroundColor: '#f4f8f9' }}>
                {/* Left column with text content */}
                <div className="col-md-6 d-flex flex-column justify-content-center p-5 gap-3">
                    {/* Main heading */}
                    <h1 className="display-4 fw-semibold">
                        Find Your Dream Home Today
                    </h1>
                    {/* Description paragraph */}
                    <p>
                        Discover exceptional properties tailored to your needs. Whether you're buying or renting, we're here to guide you every step of the way. Start your journey to the perfect home now!
                    </p>
                    {/* Call to action button */}
                    <a href="#btn-shopnow"
                        className="btn btn-m btn-success fw-semibold align-self-start">
                        Shop Now
                    </a>
                </div>
                {/* Right column with image */}
                <div className="col-md-6 position-relative">
                    {/* Hero image */}
                    <img
                        src="https://www.phw-homes.com/wp-content/uploads/2022/03/House_Cut_Out@2x.png"
                        alt="Hero Image"
                        className="w-100 h-100 object-fit-cover rounded-end"
                        style={{ position: 'relative', left: '10px' }}
                    />
                </div>
            </div>
        </section>
    );
}

// Exporting the Hero component as default
export default Hero;
