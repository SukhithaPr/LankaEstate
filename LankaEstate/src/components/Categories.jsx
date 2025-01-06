import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card } from "react-bootstrap";

function Categories({ filters, onFilterChange, onSearch }) {
    const [localFilters, setLocalFilters] = useState(filters);

    // Handle input change and update local filters state
    const handleInputChange = (name, value) => {
        const newFilters = {
            ...localFilters,
            [name]: value,
        };
        setLocalFilters(newFilters);
    };

    // Handle search button click
    const handleSearchClick = (e) => {
        e.preventDefault();
        onFilterChange(localFilters);
        onSearch();
    };

    // Options for type filter dropdown
    const typeOptions = [
        { value: "", label: "All Types" },
        { value: "House", label: "House" },
        { value: "Villa", label: "Villa" },
        { value: "Studio", label: "Studio" },
        { value: "Commercial", label: "Commercial" },
    ];

    // Options for location filter dropdown
    const locationOptions = [
        { value: "", label: "All Locations" },
        { value: "Colombo", label: "Colombo" },
        { value: "Kandy", label: "Kandy" },
        { value: "Nuwara Eliya", label: "Nuwara Eliya" },
        { value: "Deniyaya", label: "Deniyaya" },
        { value: "Ella", label: "Ella" },
        { value: "Negombo", label: "Negombo" },
        { value: "Mirissa", label: "Mirissa" },
        { value: "Maharagama", label: "Maharagama" },
    ];

    // Month map (Map month names to their indices)
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

    return (
        <Card className="p-4">
            <form className="categories mb-4 row g-3 d-flex">
                {/* Type Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Type</label>
                    <Select
                        options={typeOptions}
                        value={typeOptions.find(
                            (option) => option.value === localFilters.type
                        )}
                        onChange={(option) => handleInputChange("type", option.value)}
                        placeholder="Select Type"
                    />
                </div>

                {/* Location Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Location</label>
                    <Select
                        options={locationOptions}
                        value={locationOptions.find(
                            (option) => option.value === localFilters.location
                        )}
                        onChange={(option) => handleInputChange("location", option.value)}
                        placeholder="Select Location"
                    />
                </div>

                {/* Min and Max Bedrooms Range Filter */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <label className="form-label">Bedrooms Range</label>
                    <div className="d-flex">
                        <input
                            type="number"
                            name="minBedrooms"
                            value={localFilters.minBedrooms || ""}
                            onChange={(e) =>
                                handleInputChange("minBedrooms", Number(e.target.value))
                            }
                            min={0}
                            max={10}
                            placeholder="Min"
                            className="me-2 form-control"
                        />
                        <input
                            type="number"
                            name="maxBedrooms"
                            value={localFilters.maxBedrooms || ""}
                            onChange={(e) =>
                                handleInputChange("maxBedrooms", Number(e.target.value))
                            }
                            min={0}
                            max={10}
                            placeholder="Max"
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Date Range Filter */}
                <div className="col-md-5 col-sm-6 mb-3">
                    <label className="form-label">Date Range</label>
                    <div className="d-flex gap-2">
                        <DatePicker
                            selected={localFilters.startDate}
                            onChange={(date) => handleInputChange("startDate", date)}
                            placeholderText="Start Date"
                            className="form-control me-2"
                        />
                        <DatePicker
                            selected={localFilters.endDate}
                            onChange={(date) => handleInputChange("endDate", date)}
                            placeholderText="End Date"
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Min and Max Price Range Filter */}
                <div className="col-md-5 col-sm-6 mb-3">
                    <label className="form-label">Price Range</label>
                    <div className="d-flex">
                        <input
                            type="number"
                            name="minPrice"
                            value={localFilters.minPrice || ""}
                            onChange={(e) =>
                                handleInputChange("minPrice", Number(e.target.value))
                            }
                            min={0}
                            step={1000000}
                            placeholder="Min"
                            className="me-2 form-control"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            value={localFilters.maxPrice || ""}
                            onChange={(e) =>
                                handleInputChange("maxPrice", Number(e.target.value))
                            }
                            min={0}
                            step={1000000}
                            placeholder="Max"
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="col-md-2 col-sm-6 mb-3 d-flex align-items-end">
                    <Button
                        variant="success"
                        onClick={handleSearchClick}
                        className="px-5 py-2"
                        aria-label="Search Listings"
                    >
                        Search
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default Categories;
