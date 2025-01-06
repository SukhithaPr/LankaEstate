import React from 'react';

// Footer component definition
const Footer = () => {
    return (
        // Footer element with padding-top and centered text
        <footer className="pt-5" style={{ textAlign: 'center' }}>
            {/* Display current year and company name */}
            <p>&copy; {new Date().getFullYear()} LankaEstate. All rights reserved.</p>
        </footer>
    );
};

export default Footer;