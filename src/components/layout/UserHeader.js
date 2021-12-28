import React from 'react';
import { Link } from 'react-router-dom';

export const UserHeader = props => {
    return (
        <ul className="navbar-nav ml-auto" id="user">
            <li className="nav-item">
                <Link to={'/addCoin'} className={'nav-link'}>
                    Add coin
                </Link>
            </li>
            <li className="nav-item">
                <button className={'btn btn-link'} onClick={props.logout}>
                    Logout
                </button>
            </li>
        </ul>
    );
}

