import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Properties from '../components/Properties';

function Rentals({ wishlist, onWishlistToggle }) {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        type: '',
        location: '',
        maxPrice: null, 
        minPrice: 0,
        minBedrooms: 0,
        maxBedrooms: 10,
        startDate: null,
        endDate: null,
    });
    const [filteredProperties, setFilteredProperties] = useState([]); 

    // Fetch properties data from JSON file
    useEffect(() => {
        fetch('/properties.json') 
            .then((response) => response.json())
            .then((data) => {
                setProperties(data.properties);
            })
            .catch((error) => console.error('Error loading properties:', error));
    }, []);

    // Filter properties based on selected filters
    useEffect(() => {
        const filtered = properties.filter((property) => {
            const matchesType = filters.type ? property.type === filters.type : true;
            const matchesLocation = filters.location ? property.location.city === filters.location : true;
            const matchesPrice = (property.price >= filters.minPrice) && (filters.maxPrice ? property.price <= filters.maxPrice : true);
            const matchesBedrooms = (property.bedrooms >= filters.minBedrooms) && (property.bedrooms <= filters.maxBedrooms);
            const matchesDateRange = (!filters.startDate ||
                new Date(property.added.year, monthMap[property.added.month], property.added.day) >= new Date(filters.startDate)) &&
                (!filters.endDate ||
                    new Date(property.added.year, monthMap[property.added.month], property.added.day) <= new Date(filters.endDate));

            return matchesType && matchesLocation && matchesPrice && matchesBedrooms && matchesDateRange;
        });
        setFilteredProperties(filtered);
    }, [filters, properties]);

    // Map month names to their respective numbers
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    // Handle search button click
    const handleSearch = () => {
        console.log('Applied Filters:', filters);
    };

    return (
        <div className="sales-page container py-4">
            <h1 className="mb-4 text-center fw-bold">Find Your Perfect Property</h1>
            <Categories filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
            <Properties
                properties={filteredProperties}
                wishlist={wishlist}
                onWishlistToggle={onWishlistToggle}
            />
        </div>
    );
}

export default Rentals;
