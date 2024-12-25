function Carousel() {
    return (
        <section className="container py-5 px-4 fixed-section">
            <h2 className="fw-semibold">Featured Projects</h2>
            <br />
            <div id="hero-carousel" className="carousel slide shadow" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>

                <div className="carousel-inner">

                    <div className="carousel-item active c-item">
                        <img src="https://www.homelandsskyline.lk/uploads/1709179862395-Greendale_Retirement_Apartments%20(1).jpg" className="d-block w-100 c-img" alt="Slide 1" />
                        <div class="carousel-caption d-none d-md-block">
                            <h1 className="shadow-md">GREENDALE RETIREMENT RESORT APARTMENT FOR SALE IN ATHURUGIRIYA</h1>
                        </div>
                    </div>

                    <div className="carousel-item c-item">
                        <img src="https://www.homelandsskyline.lk/uploads/1709198682054-Canterbury_Lexus_Golf_Apartments%20(1).jpg" className="d-block w-100 c-img" alt="Slide 2" />
                        <div class="carousel-caption d-none d-md-block">
                            <h1>CANTERBURY LEXUS GOLF RESORT APARTMENTS FOR SALE IN PILIYANDALA</h1>
                        </div>
                    </div>

                    <div className="carousel-item c-item">
                        <img src="https://www.homelandsskyline.lk/uploads/1724322763827-waterdale-new-banner-1.jpg" className="d-block w-100 c-img" alt="Slide 3" />
                        <div class="carousel-caption d-none d-md-block">
                            <h1>WATERDALE RESIDENCIES FOR SALE IN COLOMBO 7 BORDER</h1>
                        </div>
                    </div>

                    <div className="carousel-item active c-item">
                        <img src="https://www.homelandsskyline.lk/uploads/1709116134579-Oceana_beach_resort_Apartment_Wadduwa%20(11).jpg" className="d-block w-100 c-img" alt="Slide 4" />
                        <div class="carousel-caption d-none d-md-block">
                            <h1>OCEANA BEACH RESORT APARTMENTS - FOR SALE IN WADDUWA</h1>
                        </div>
                    </div>

                    <div className="carousel-item c-item">
                        <img src="https://www.homelandsskyline.lk/uploads/1709120350168-Cressida_Resort_Apartments%20(1).jpg" className="d-block w-100 c-img" alt="Slide 5" />
                        <div class="carousel-caption d-none d-md-block">
                            <h1>CRESSIDA RESORT APARTMENTS FOR SALE IN ATHURUGIRIYA</h1>
                        </div>
                    </div>

                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    );
}

export default Carousel;
