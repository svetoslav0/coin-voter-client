import React from 'react';
import { Link } from 'react-router-dom';

import { SearchBar } from '../search/SearchBar';

export const Nav = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={'/'} className={'nav-link'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <SearchBar />
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    {props.header}
                </div>
            </div>
        </nav>
    );
};
