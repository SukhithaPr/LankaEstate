import React, { createContext, useContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (property) => {
        setWishlist((prev) => [...prev, property]);
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};