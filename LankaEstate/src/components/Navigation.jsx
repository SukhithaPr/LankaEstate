import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Navigation component definition
const Navigation = ({ wishlist, onWishlistToggle, onClearWishlist }) => {
    // State to manage the visibility of the wishlist drawer
    const [showWishlist, setShowWishlist] = useState(false);
    // State to manage the visibility of the navbar on smaller screens
    const [showNavbar, setShowNavbar] = useState(false);
    const navigate = useNavigate();

    // Toggle the visibility of the wishlist drawer
    const toggleWishlist = () => {
        setShowWishlist(!showWishlist);
    };

    // Toggle the visibility of the navbar
    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    // Prevent default behavior for drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle drop event to add item to wishlist
    const handleDrop = (e) => {
        e.preventDefault();
        const draggedProperty = JSON.parse(e.dataTransfer.getData("property"));
        onWishlistToggle(draggedProperty);
    };

    // Navigate to property details page
    const handleViewDetails = (id) => {
        navigate(`/property/${id}`);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="glass-navbar navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container-fluid px-4">
                    {/* Brand logo */}
                    <a className="navbar-brand fs-3 fw-bolder text-success d-flex align-items-center" href="/">
                        LankaEstate
                    </a>
                    {/* Navbar toggler button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-controls="navbarContent"
                        aria-expanded={showNavbar ? "true" : "false"}
                        aria-label="Toggle navigation"
                        onClick={toggleNavbar}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Navbar links */}
                    <div className={`collapse navbar-collapse ${showNavbar ? 'show' : ''}`} id="navbarContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/Sales" className="nav-link px-3 fw-bold">
                                    Sales
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Rentals" className="nav-link px-3 fw-bold">
                                    Rentals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact" className="nav-link px-3 fw-bold">
                                    Contact us
                                </Link>
                            </li>
                        </ul>

                        {/* Wishlist button */}
                        <div className="position-relative">
                            <button
                                onClick={toggleWishlist}
                                className="btn btn-outline-success fw-semibold shadow wishlist-btn"
                            >
                                <i className="bi bi-suit-heart me-1"></i>
                                Wishlist
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {wishlist.length}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Wishlist Drawer */}
            <div className={`wishlist-drawer ${showWishlist ? 'show' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="wishlist-header d-flex justify-content-between align-items-center p-3">
                    <h5 className="fw-bold mb-0">My Wishlist ({wishlist.length})</h5>
                    <button onClick={toggleWishlist} className="btn-close" aria-label="Close">
                        <i class="bi bi-x-square"></i>
                    </button>
                </div>
                <br />
                <div className="wishlist-content px-3 pb-3">
                    {wishlist.length > 0 ? (
                        <>
                            <ul className="list-group mb-3">
                                {wishlist.map((item) => (
                                    <li
                                        key={item.id}
                                        className="list-group-item d-flex justify-content-between align-items-center gap-1"
                                    >
                                        <div className="d-flex flex-column align-items-center gap-2">
                                            <img
                                                className="rounded"
                                                src={item.picture?.main || 'fallback-image-url.jpg'}
                                                alt={item.title || 'No title available'}
                                                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                            />
                                            <div className="d-flex gap-2">
                                                <span className="fw-bold">{item.title}</span>
                                                <button
                                                    onClick={() => onWishlistToggle(item)}  // Remove from wishlist
                                                    className="my-2 btn btn-danger btn-sm"
                                                    title="Remove from Wishlist"
                                                >
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleViewDetails(item.id)}
                                                className="btn btn-outline-success btn-sm w-100"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={onClearWishlist}
                                className="btn btn-outline-danger btn-sm w-100"
                            >
                                Clear All
                            </button>
                        </>
                    ) : (
                        <p>Your Wishlist is empty!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navigation;