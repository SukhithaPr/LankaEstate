import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WishlistSidebar from './WishlistSidebar';

const Navigation = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prevState) => !prevState);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top glass-navbar">
                <div className="container-fluid px-5">
                    <a className="navbar-brand fs-3 fw-bolder text-success d-flex align-items-center" href="/">
                        LankaEstate
                    </a>

                    <input type="checkbox" className="d-none" id="nav-toggle" />
                    <label 
                        className="navbar-toggler border-0"
                        htmlFor="nav-toggle"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </label>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/Sales" className="nav-link px-3 fw-semibold">
                                    Sales
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Rentals" className="nav-link px-3 fw-semibold">
                                    Rentals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact" className="nav-link px-3 fw-semibold">
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                        
                        <div>
                            <button
                                onClick={toggleSidebar}
                                className="btn btn-outline-success fw-semibold shadow"
                            >
                                <i className="bi bi-suit-heart me-1"></i>
                                Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Component */}
            <WishlistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
};

export default Navigation;