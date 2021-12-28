import { Link } from 'react-router-dom';
import React from "react";

export const AdminHeader = props => {
    const unapprovedCoinsCount = props.unapprovedCoinsCount;

    return (
        <ul className="navbar-nav ml-auto" >
            <li className="nav-item">
                <Link to={'/requests'} className={'nav-link position-relative'}>
                    Coin Requests

                    {unapprovedCoinsCount > 0
                        ?
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {unapprovedCoinsCount}
                            <span className="visually-hidden">unread messages</span>
                            </span>
                        : ''
                    }
                </Link>
            </li>

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

export default AdminHeader;
