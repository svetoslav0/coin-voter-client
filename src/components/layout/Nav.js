import React from 'react';
import { Link } from 'react-router-dom';

import { SearchBar } from '../search/SearchBar';

export const Nav = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/'} className={'nav-link'}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* TODO: This might be dynamic */}
                            <Link to={'/categories/1'} className={'nav-link'}>
                                Categories
                            </Link>
                        </li>
                        <div className="nav-spacer">

                        </div>
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
