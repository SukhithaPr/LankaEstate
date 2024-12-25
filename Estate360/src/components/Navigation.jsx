import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid px-5">

                <a className="navbar-brand fs-3 fw-bolder text-success d-flex align-items-center" href="/">
                    {/* <i className="bi bi-house-heart-fill me-2"></i> */}
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
                            <Link to="/Sales" className="nav-link px-3 fw-semibold" href="/sales">
                                Sales
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Rentals" className="nav-link px-3 fw-semibold" href="/rentals">
                                Rentals
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Contact" className="nav-link px-3 fw-semibold" href="/contact">
                                Contact us
                            </Link>
                        </li>
                    </ul>
                    
                    <div>
                        <Link to="/Wishlist" className="btn btn-outline-success fw-semibold shadow">
                            <i className="bi bi-suit-heart me-1"></i>
                            Wishlist
                        </Link>
                    </div>
                </div>
            </div>

            <style>
                {`
                    #nav-toggle:checked + label + .collapse {
                        display: block !important;
                    }
                `}
            </style>
        </nav>
    );
};

export default Navigation;