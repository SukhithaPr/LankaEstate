import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Properties from '../components/Properties';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Sales() {
    const [properties, setProperties] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/properties.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch properties data');
                }
                return response.json();
            })
            .then((data) => setProperties(data?.properties || []))
            .catch((error) => {
                console.error('Error fetching properties:', error);
                setError('Unable to load properties. Please try again later.');
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {

        if (selectedFilters.length > 0) {
            setFilteredItems(
                properties.filter((property) => selectedFilters.includes(property.type))
            );
        } else {
            setFilteredItems(properties);
        }
    }, [selectedFilters, properties]);

    const handleFilterChange = (category) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(category)
                ? prevFilters.filter((filter) => filter !== category)
                : [...prevFilters, category]
        );
    };

    return (
        <div>
            <Navigation />
        <div className="container py-4">
            {isLoading ? (
                <p className="text-center text-muted">Loading properties...</p>
            ) : error ? (
                <p className="text-center text-danger">{error}</p>
            ) : (
                <>
                    <Categories
                        properties={properties}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                    />
                    <Properties properties={filteredItems} />
                </>
            )}
        </div>
        <Footer />
        </div>
    );
}

export default Sales;