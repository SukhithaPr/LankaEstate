import React from 'react';

const WishlistSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`wishlist-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <h4>Wishlist</h4>
                <button className="close-btn" onClick={toggleSidebar}>
                    &times;
                </button>
            </div>
            <div className="sidebar-content">
                <p>Your wishlist is empty!</p>
                {/* Render wishlist items here */}
            </div>
        </div>
    );
};

export default WishlistSidebar;