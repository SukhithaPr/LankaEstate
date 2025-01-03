import React from 'react';

function Properties() {
    return (
        <section className="container px-4 fixed-section">
            <h2 className="fw-semibold" id='btn-shopnow'>Trending</h2>
            <br />
            <div className="d-flex gap-4 justify-content-center">
                <div className="card shadow-sm" style={{ width: '18rem' }}>
                    <img
                        src="https://www.homelandsskyline.lk/uploads/1704873349747-greendale-slide_01%20(1).webp"
                        className="card-img-top"
                        alt="Property"
                    />
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">GREENDALE RETIREMENT COTTAGE</h5>
                        <p className="card-text">
                            A serene retirement community designed for comfortable and peaceful living amidst lush greenery. Perfect for a relaxing lifestyle.
                        </p>
                        <a href="https://www.homelandsskyline.lk/housing-project/greendale-retirement-cottage-for-sale-in-athurugiriya" target="_blank" className="btn btn-success bg-success">More info</a>
                    </div>
                </div>
                <div className="card shadow-sm" style={{ width: '18rem' }}>
                    <img
                        src="https://www.homelandsskyline.lk/uploads/1710232397542-Artboard%204.jpg"
                        className="card-img-top"
                        alt="Property"
                    />
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">OCEANA BEACH VILLAS</h5>
                        <p className="card-text">
                            Luxurious beachfront villas offering breathtaking ocean views and world-class amenities. A true haven by the sea.
                        </p>
                        <a href="https://www.homelandsskyline.lk/housing-project/luxury-beach-villas-for-sale-in-wadduwa" target="_blank" className="btn btn-success bg-success">More info</a>
                    </div>
                </div>
                <div className="card shadow-sm" style={{ width: '18rem' }}>
                    <img
                        src="https://www.homelandsskyline.lk/uploads/1704872215663-image_01_villa_for_sale_in_kahathuduwa_new.webp"
                        className="card-img-top"
                        alt="Property"
                    />
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">CANTERBURY GOLF VILLA</h5>
                        <p className="card-text">
                            Elegant villas situated next to a world-class golf course. Ideal for those who appreciate luxury and the game of golf.
                        </p>
                        <br />
                        <a href="https://www.homelandsskyline.lk/housing-project/canterbury-golf-villa-for-sale-in-piliyandala" target="_blank" className="btn btn-success bg-success">More info</a>
                    </div>
                </div>
                <div className="card shadow-sm" style={{ width: '18rem' }}>
                    <img
                        src="https://www.homelandsskyline.lk/uploads/1704871770660-image_01_house_for_sale_in_kahathuduwa_new%20(1).webp"
                        className="card-img-top"
                        alt="Property"
                    />
                    <div className="card-body">
                        <h5 className="card-title fw-semibold">CANTERBURY RESIDENCIES</h5>
                        <p className="card-text">
                            Modern residencies in a prime location, offering premium facilities and easy access to urban conveniences.
                        </p>
                        <br />
                        <a href="https://www.homelandsskyline.lk/housing-project/canterbury-house-for-sale-in-piliyandala" target="_blank" className="btn btn-success bg-success">More info</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Properties;