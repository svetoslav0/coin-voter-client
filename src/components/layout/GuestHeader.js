import React from 'react';
import { Link } from 'react-router-dom';

export const GuestHeader = () => {
    return (
        <ul className="navbar-nav ml-auto" id="guest">
            <li className="nav-item">
                <Link to={'/login'} className={'nav-link'}>
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/register'} className={'nav-link'}>
                    Register
                </Link>
            </li>
        </ul>
    );
};
