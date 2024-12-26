import React from 'react';

function PropertyCard({ type, title, bedrooms, price, tenure, description, location, picture, url, added }) {
    return (
        <div className="card h-100 shadow-sm border-0">
            <img
                src={picture}
                alt={`Image of ${type}`}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
            />
            <div className="card-body">
                <h5
                    className="card-title"
                    style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {title}
                </h5>


                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">{bedrooms} Bedrooms</span>
                    <span className="badge bg-success">{type}</span>
                </div>
                <p className="card-text text-muted small">{description}</p>
                <ul className="list-unstyled small mb-3">
                    <li><strong>Price:</strong> Rs.{price.toLocaleString()}</li>
                    <li><strong>Tenure:</strong> {tenure}</li>
                    <li><strong>Added:</strong> {`${added.day} ${added.month} ${added.year}`}</li>
                </ul>
                <a
                    href={url}
                    className="btn btn-outline-success btn-sm w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Details
                </a>
            </div>
        </div>
    );
}

export default PropertyCard;