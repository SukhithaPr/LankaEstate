import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Properties from '../components/Properties';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Sales() {
    const [properties, setProperties] = useState([]); // All properties
    const [filters, setFilters] = useState({
        type: '',
        location: '',
        maxPrice: Infinity,
        minBedrooms: 0,
    });
    const [filteredProperties, setFilteredProperties] = useState([]); // Filtered properties

    // Fetch properties data
    useEffect(() => {
        fetch('/properties.json') // Adjust path if necessary
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
                setFilteredProperties(data.properties); // Show all properties by default
            })
            .catch((error) => console.error('Error loading properties:', error));
    }, []);

    // Function to apply filters (triggered by the search button)
    const applyFilters = () => {
        const filtered = properties.filter((property) => {
            const matchesType = filters.type ? property.type === filters.type : true;
            const matchesLocation = filters.location ? property.location === filters.location : true;
            const matchesPrice = property.price <= filters.maxPrice;
            const matchesBedrooms = property.bedrooms >= filters.minBedrooms;

            return matchesType && matchesLocation && matchesPrice && matchesBedrooms;
        });
        setFilteredProperties(filtered);
    };

    // Handle filter changes from Categories component
    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    return (
        <>
            <Navigation />
            <div className="sales-page container py-4">
                <h1 className="mb-4 text-center fw-bold">Find Your Perfect Property</h1>
                <Categories filters={filters} onFilterChange={handleFilterChange} onSearch={applyFilters} />
                <Properties properties={filteredProperties} />
            </div>
            <Footer />
        </>
    );
}

export default Sales;