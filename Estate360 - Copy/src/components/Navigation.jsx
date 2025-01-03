import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ wishlist, onWishlistToggle, onClearWishlist }) => {
    const [showWishlist, setShowWishlist] = useState(false);

    const toggleWishlist = () => {
        setShowWishlist(!showWishlist);
    };

    return (
        <>
            <nav className="glass-navbar navbar navbar-expand-lg navbar-light">
                <div className="container-fluid px-5">
                    <a className="navbar-brand fs-3 fw-bolder text-success d-flex align-items-center" href="/">
                        LankaEstate
                    </a>

                    <input type="checkbox" className="d-none" id="nav-toggle" />
                    <label
                        className="navbar-toggler border-0"
                        htmlFor="nav-toggle"
                        aria-label="Toggle navigation"
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

                        <div class="position-relative">
                            <button
                                onClick={toggleWishlist}
                                className="btn btn-outline-success fw-semibold shadow"
                            >
                                <i className="bi bi-suit-heart me-1"></i>
                                Wishlist
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                    {wishlist.length}
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Wishlist Drawer */}
            <div className={`wishlist-drawer ${showWishlist ? 'show' : ''}`}>
                <div className="wishlist-header d-flex justify-content-between align-items-center p-3">
                    <h5 className="fw-bold mb-0">My Wishlist ({wishlist.length})</h5>
                    <button onClick={toggleWishlist} className="btn-close"></button>
                </div>
                <div className="wishlist-content px-3 pb-3">
                    {wishlist.length > 0 ? (
                        <>
                            <ul className="list-group mb-3">
                                {wishlist.map((item) => (
                                    <li
                                        key={item.id}
                                        className="list-group-item d-flex justify-content-between align-items-center gap-1"
                                    >
                                        <span>{item.title}</span>
                                        <button
                                            onClick={() => onWishlistToggle(item)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i class="bi bi-trash3-fill"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {/* Clear All Button */}
                            <button
                                onClick={onClearWishlist}
                                className="btn btn-outline-danger btn-sm w-100"
                            >
                                Clear All
                            </button>
                        </>
                    ) : (
                        <p className="text-muted">Your Wishlist is empty!</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navigation;
