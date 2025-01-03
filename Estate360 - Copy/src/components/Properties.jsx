import React from 'react';
import PropertyCard from './PropertyCard';

function Properties({ properties, onWishlistToggle, wishlist }) {
    return (
        <div className="container py-4">
            {properties.length > 0 ? (
                <div className="row gy-4">
                    {properties.map((el) => (
                        <div key={el.id} className="col-sm-6 col-md-4 col-lg-3">
                            <PropertyCard
                                id={el.id}
                                type={el.type}
                                title={el.title}
                                bedrooms={el.bedrooms}
                                price={el.price}
                                tenure={el.tenure}
                                description={el.description}
                                location={el.location}
                                picture={el.picture}
                                url={el.url}
                                added={el.added}
                                isWishlisted={wishlist.some((item) => item.id === el.id)}
                                onWishlistToggle={onWishlistToggle}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No properties match the selected filters.</p>
            )}
        </div>
    );
}

export default Properties;
