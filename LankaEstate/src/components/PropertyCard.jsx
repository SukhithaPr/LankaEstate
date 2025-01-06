import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    url,
    added,
    isWishlisted,
    onWishlistToggle,
}) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/property/${id}`); // Navigate to property details page
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("property", JSON.stringify({
            id,
            type,
            title,
            bedrooms,
            price,
            tenure,
            description,
            location,
            picture,
            url,
            added,
        })); // Handle drag start event
    };

    return (
        <div
            className="card h-100 shadow-sm border-1 position-relative"
            draggable="true"
            onDragStart={handleDragStart}
        >
            {/* Heart Icon */}
            <button
                onClick={() => onWishlistToggle({ id, type, title, bedrooms, price, tenure, description, location, picture, url, added })}
                className="btn btn-light btn-sm position-absolute rounded-circle"
                style={{ top: '10px', right: '10px', zIndex: 10, fontSize: '1rem' }}
                aria-label="Add to Wishlist"
            >
                <i className={`bi ${isWishlisted ? 'bi-suit-heart-fill text-danger' : 'bi-suit-heart text-dark'}`}></i>
            </button>

            <img
                src={picture.main}
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
                    <h6 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        {title}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-primary">{bedrooms} Bedrooms</span>
                        <span className="badge bg-success">{type}</span>
                    </div>
                    <p className="card-text text-muted small">{description}</p>
                    <ul className="list-unstyled small mb-3">
                        <li><strong>Price:</strong> Rs.{price.toLocaleString()}</li>
                        <li><strong>Tenure:</strong> {tenure}</li>
                        <li><strong>Added:</strong> {`${added.day} ${added.month} ${added.year}`}</li>
                        <li>
                            <strong>Location:</strong>{' '}
                            <span className="text-success">
                                <i className="bi bi-geo-alt-fill"></i> {location.city}
                            </span>
                        </li>
                    </ul>
                </div>
                <button onClick={handleViewDetails} className="btn btn-outline-success btn-sm w-100">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default PropertyCard;
