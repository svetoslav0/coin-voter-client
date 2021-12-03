import React from 'react';

export const Footer = props => {
    const year = (new Date()).getFullYear();

    // TODO: Change links when static pages are ready
    return (
        <div className="container footer-container">
            <div className="footer-links">
                <a href="#">Terms and Conditions</a>
                <a href="#">Privacy Policy</a>
            </div>
            <div>
                Site Name &copy; {year}
            </div>
        </div>
    );
};
