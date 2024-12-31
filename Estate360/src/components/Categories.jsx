import React, { useState } from 'react';

function Categories({ filters, onFilterChange, onSearch }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = {
            ...localFilters,
            [name]: name === 'maxPrice' || name === 'minBedrooms' ? Number(value) : value,
        };
        setLocalFilters(newFilters);
        onFilterChange(newFilters); // Update parent state immediately for better UX
    };

    const handleSearchClick = (e) => {
        e.preventDefault(); // Prevent form submission
        onSearch(); // Trigger the search action
    };

    return (
        <form className="categories mb-4 row g-3">
            <div className="col-md-3">
                <label className="form-label">Type</label>
                <select name="type" className="form-select" value={localFilters.type} onChange={handleInputChange}>
                    <option value="">All Types</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Studio">Studio</option>
                    <option value="Commercial">Commercial</option>
                </select>
            </div>
            <div className="col-md-3">
                <label className="form-label">Location</label>
                <select name="location" className="form-select" value={localFilters.location} onChange={handleInputChange}>
                    <option value="">All Locations</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Galle">Matara</option>
                    <option value="Jaffna">Jaffna</option>
                </select>
            </div>
            <div className="col-md-3">
                <label className="form-label">Max Price</label>
                <input
                    type="number"
                    name="maxPrice"
                    className="form-control"
                    value={localFilters.maxPrice === Infinity ? '' : localFilters.maxPrice}
                    placeholder="e.g., 1000000"
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-md-3">
                <label className="form-label">Min Bedrooms</label>
                <input
                    type="number"
                    name="minBedrooms"
                    className="form-control"
                    value={localFilters.minBedrooms}
                    placeholder="e.g., 2"
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-12 text-end">
                <button className="btn btn-success" onClick={handleSearchClick}>
                    Search
                </button>
            </div>
        </form>
    );
}

export default Categories;