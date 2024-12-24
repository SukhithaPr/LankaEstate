import React from 'react';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div>
                    <a className="navbar-brand fs-3 fw-bold" href="/">
                        LankaEstate
                    </a>
                </div>

                <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
                    <ul className="navbar-nav mx-auto fw-bold">
                        <li className="nav-item px-3">
                            <a className="nav-link" style={{ color: '#1A453C' }} href="/">
                                Sales
                            </a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" style={{ color: '#1A453C' }} href="/">
                                Rentals
                            </a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link" style={{ color: '#1A453C' }} href="/">
                                Contact us
                            </a>
                        </li>
                    </ul>
                </div>

                <button
                    className="btn rounded-circle"
                    style={{ backgroundColor: '#1A453C', padding: '0.5rem 1rem' }}
                    aria-label="Add to wishlist"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="text-white wishlist-icon bi bi-heart-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        />
                    </svg>
                    {/* <span className="ms-2 fw-bold text-white d-none d-md-inline">
                        My wishlist
                    </span> */}
                </button>

            </div>
        </nav>
    );
};

export default Navigation;