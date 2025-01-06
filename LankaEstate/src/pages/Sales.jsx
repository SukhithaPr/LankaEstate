import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Properties from '../components/Properties';

function Sales({ wishlist, onWishlistToggle }) {
    const [properties, setProperties] = useState([]); // All properties
    const [filters, setFilters] = useState({
        type: '',
        location: '',
        maxPrice: null, // Updated to handle null instead of Infinity
        minPrice: 0,
        minBedrooms: 0,
        maxBedrooms: 10, // Added maxBedrooms filter
        startDate: null,
        endDate: null,
    });
    const [filteredProperties, setFilteredProperties] = useState([]); // Filtered properties

    // Fetch properties data
    useEffect(() => {
        fetch('/properties.json') // Adjust path if necessary
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
            })
            .catch((error) => console.error('Error loading properties:', error));
    }, []);

    // Apply filters when filters or properties change
    useEffect(() => {
        const filtered = properties.filter((property) => {
            const matchesType = filters.type ? property.type === filters.type : true;
            const matchesLocation = filters.location ? property.location.city === filters.location : true;
            const matchesPrice = (property.price >= filters.minPrice) && (filters.maxPrice ? property.price <= filters.maxPrice : true);
            const matchesBedrooms = (property.bedrooms >= filters.minBedrooms) && (property.bedrooms <= filters.maxBedrooms);
            const matchesDateRange = (!filters.startDate || new Date(property.added.year, property.added.month) >= new Date(filters.startDate)) &&
                                      (!filters.endDate || new Date(property.added.year, property.added.month) <= new Date(filters.endDate));

            return matchesType && matchesLocation && matchesPrice && matchesBedrooms && matchesDateRange;
        });
        setFilteredProperties(filtered);
    }, [filters, properties]);

    // Handle filter changes from Categories component
    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    // Handle Search (log current filters)
    const handleSearch = () => {
        console.log('Applied Filters:', filters);
    };

    return (
        <div className="sales-page container py-4">
            <h1 className="mb-4 text-center fw-bold">Find Your Perfect Property</h1>
            <Categories filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
            <Properties
                properties={filteredProperties}
                wishlist={wishlist} // Pass the wishlist state
                onWishlistToggle={onWishlistToggle} // Pass the toggle function
            />
        </div>
    );
}

export default Sales;
