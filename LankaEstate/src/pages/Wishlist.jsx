import React from 'react';

const Wishlist = ({ wishlist, onWishlistToggle }) => {
    return (
        <div className="container py-4">
            <h4 className="mb-4">Your Wishlist</h4>
            {wishlist.length > 0 ? (
                <div className="row gy-4">
                    {wishlist.map((property) => (
                        <div key={property.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm border-1 position-relative">
                                <img
                                    src={property.picture.main}
                                    alt={property.title}
                                    className="card-img-top"
                                    style={{
                                        height: '200px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div className="card-body">
                                    <h6>{property.title}</h6>
                                    <p className="text-muted small">{property.description}</p>
                                    <button
                                        onClick={() => onWishlistToggle(property)}
                                        className="btn btn-danger btn-sm w-100"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
