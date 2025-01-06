import React, { useState } from 'react';
import { DropdownList, NumberPicker, DateTimePicker } from 'react-widgets';
import 'react-widgets/styles.css';
import { Button, Card } from 'react-bootstrap';

function Categories({ filters, onFilterChange, onSearch }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = {
            ...localFilters,
            [name]: name === 'maxPrice' || name === 'minPrice' || name === 'minBedrooms' || name === 'maxBedrooms' ? Number(value) : value,
        };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        onSearch();
    };

    const typeOptions = [
        { value: '', label: 'All Types' },
        { value: 'House', label: 'House' },
        { value: 'Villa', label: 'Villa' },
        { value: 'Studio', label: 'Studio' },
        { value: 'Commercial', label: 'Commercial' },
    ];

    const locationOptions = [
        { value: '', label: 'All Locations' },
        { value: 'Colombo', label: 'Colombo' },
        { value: 'Kandy', label: 'Kandy' },
        { value: 'Nuwara Eliya', label: 'Nuwara Eliya' },
        { value: 'Galle', label: 'Matara' },
        { value: 'Jaffna', label: 'Jaffna' },
    ];

    return (
        <Card className="p-4">
            <form className="categories mb-4 row g-3 d-flex">
                {/* Type Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Type</label>
                    <DropdownList
                        data={typeOptions}
                        value={typeOptions.find(option => option.value === localFilters.type)}
                        textField="label"
                        valueField="value"
                        onChange={(value) => handleInputChange({ target: { name: 'type', value } })}
                        className="form-control"
                        aria-label="Select Property Type"
                    />
                </div>

                {/* Location Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Location</label>
                    <DropdownList
                        data={locationOptions}
                        value={locationOptions.find(option => option.value === localFilters.location)}
                        textField="label"
                        valueField="value"
                        onChange={(value) => handleInputChange({ target: { name: 'location', value } })}
                        className="form-control"
                        aria-label="Select Location"
                    />
                </div>

                {/* Min and Max Bedrooms Range Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Bedrooms Range</label>
                    <div className="d-flex">
                        <NumberPicker
                            name="minBedrooms"
                            value={localFilters.minBedrooms}
                            onChange={(value) => handleInputChange({ target: { name: 'minBedrooms', value } })}
                            min={0}
                            max={10}
                            step={1}
                            placeholder="Min"
                            className="me-2 form-control"
                            aria-label="Min Bedrooms"
                        />
                        <NumberPicker
                            name="maxBedrooms"
                            value={localFilters.maxBedrooms}
                            onChange={(value) => handleInputChange({ target: { name: 'maxBedrooms', value } })}
                            min={0}
                            max={10}
                            step={1}
                            placeholder="Max"
                            className="form-control"
                            aria-label="Max Bedrooms"
                        />
                    </div>
                </div>

                {/* Date Range Filter */}
                <div className="col-md-5 col-sm-6 mb-3">
                    <label className="form-label">Date Range</label>
                    <div className="d-flex">
                        <DateTimePicker
                            name="startDate"
                            value={localFilters.startDate}
                            onChange={(value) => handleInputChange({ target: { name: 'startDate', value } })}
                            placeholder="Start Date"
                            className="me-2 form-control"
                            aria-label="Start Date"
                        />
                        <DateTimePicker
                            name="endDate"
                            value={localFilters.endDate}
                            onChange={(value) => handleInputChange({ target: { name: 'endDate', value } })}
                            placeholder="End Date"
                            className="form-control"
                            aria-label="End Date"
                        />
                    </div>
                </div>

                {/* Min and Max Price Range Filter */}
                <div className="col-md-5 col-sm-6 mb-3">
                    <label className="form-label">Price Range</label>
                    <NumberPicker
                        name="minPrice"
                        value={localFilters.minPrice || 0} // Set default if undefined
                        onChange={(value) => handleInputChange({ target: { name: 'minPrice', value } })}
                        min={0}
                        step={1000000}
                        placeholder="Min"
                        className="me-2 form-control"
                        aria-label="Min Price"
                    />
                    <NumberPicker
                        name="maxPrice"
                        value={localFilters.maxPrice === Infinity ? '' : localFilters.maxPrice} // Handle Infinity case
                        onChange={(value) => handleInputChange({ target: { name: 'maxPrice', value } })}
                        min={0}
                        step={1000000}
                        placeholder="Max"
                        className="form-control"
                        aria-label="Max Price"
                    />
                </div>

            {/* Search Button */}
            <div className="col-md-2 col-sm-6 mb-3 d-flex align-items-end">
                <Button variant="success" onClick={handleSearchClick} className="px-5 py-2" aria-label="Search Listings">
                    Search
                </Button>
            </div>
        </form>
        </Card >
    );
}

export default Categories;
