import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} LankaEstate. All rights reserved.</p>
        </footer>
    );
};

export default Footer;