import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from './WishlistContext';

function PropertyCard({
    id,
    type,
    title,
    bedrooms,
    price,
    tenure,
    description,
    location,
    picture,
    added,
}) {
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isLiked = wishlist.some((item) => item.id === id);

    const handleViewDetails = () => {
        navigate(`/property/${id}`);
    };

    const handleWishlistToggle = () => {
        const property = {
            id,
            type,
            title,
            bedrooms,
            price,
            tenure,
            description,
            location,
            picture,
            added,
        };

        if (isLiked) {
            removeFromWishlist(id);
        } else {
            addToWishlist(property);
        }
    };

    return (
        <div className="card h-100 shadow-sm border-0 position-relative">
            <i
                aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`bi ${
                    isLiked ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart text-muted'
                } absolute top-4 right-4 cursor-pointer`}
                onClick={handleWishlistToggle}
                style={{ fontSize: '1.5rem' }}
            ></i>
            <img
                src={picture?.main || '/fallback-image.jpg'}
                alt={`Image of ${type}`}
                className="card-img-top"
                style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                }}
            />
            <div className="card-body d-flex flex-column">
                <div className="flex-grow-1">
                    <h6 className="card-title">{title}</h6>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-primary">{bedrooms} Bedrooms</span>
                        <span className="badge bg-success">{type}</span>
                    </div>
                    <p className="card-text text-muted small">{description}</p>
                    <ul className="list-unstyled small mb-3">
                        <li><strong>Price:</strong> Rs.{price.toLocaleString()}</li>
                        <li><strong>Tenure:</strong> {tenure || 'Not specified'}</li>
                        <li>
                            <strong>Location:</strong>{' '}
                            <span className="text-success">
                                <i className="bi bi-geo-alt-fill"></i> {location || 'Not available'}
                            </span>
                        </li>
                    </ul>
                </div>
                <button
                    onClick={handleViewDetails}
                    className="btn btn-success btn-sm w-100"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

export default PropertyCard;
