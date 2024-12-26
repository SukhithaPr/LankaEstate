import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

function Properties() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch('/properties.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch properties data');
                }
                return response.json();
            })
            .then((data) => setProperties(data.properties))
            .catch((error) => console.error('Error fetching properties:', error));
    }, []);

    return (
        <div className="container py-4">
            {properties.length > 0 ? (
                <div className="row gy-4">
                    {properties.map((el) => (
                        <div key={el.id} className="col-sm-6 col-md-4 col-lg-3">
                            <PropertyCard
                                id={el.id}
                                type={el.type}
                                bedrooms={el.bedrooms}
                                price={el.price}
                                tenure={el.tenure}
                                description={el.description}
                                location={el.location}
                                picture={el.picture}
                                url={el.url}
                                added={el.added}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">Loading properties...</p>
            )}
        </div>
    );
}

export default Properties;